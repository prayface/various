<template>
    <div class="ui-carousel ui-default-carousel" :style="style" ref="main">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-carousel-control ui-carousel-left-control" @click="skip(active - 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-carousel-control ui-carousel-right-control" @click="skip(active + 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>

        <!-- 轮播图分页器 -->
        <div class="ui-carousel-schedules" v-if="pagination">
            <template v-for="(value, index) in childrens" :key="index">
                <div class="ui-carousel-schedule" :class="{ active: index == active }" @click="skip(index, value)"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import composable from "../composable";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { UiCarouselPropsOption } from "../carousel";

// DOM响应式变量声明
const main = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();
const childrens = ref<HTMLElement[]>([]);

// 响应式变量声明
const active = ref<number>(0);
const skipTimer = ref<NodeJS.Timer>();
const autoTimer = ref<NodeJS.Timer>();

// 获取Props配置
const define = defineProps(UiCarouselPropsOption);

// 静态变量计算
const delay = define.transitionDelay / 1000;
const delayUp = define.transitionDelay * 1.1;

// 计算数据获取
const { style } = composable.useComputeds(define);

// 初始化函数
const init = () => {
    //* 获取模块容器失败则取消后续操作
    if (!main.value || !container.value || !container.value?.children?.length) return;
    //* 初始化临时变量
    const config = { size: 0 };
    //* 初始化childrens
    childrens.value = [];
    for (let i = 0; i < container.value.children.length; i++) {
        //* 获取node节点
        const node = container.value.children[i] as HTMLElement;
        //* 设置node的偏移
        node.style.transform = `translate3d(${100 * i}%, 0, 0)`;
        //* 偏移量计算
        config.size += node.clientWidth;
        //* 缓存node节点
        childrens.value.push(node);
    }

    //* 无限滚动的辅助内容生成
    if (define.loop) {
        const nodeHeader = childrens.value[childrens.value.length - 1].cloneNode(true) as HTMLElement;
        const nodeFooter = childrens.value[0].cloneNode(true) as HTMLElement;
        if (nodeHeader && nodeFooter) {
            //* 样式调整
            nodeHeader.style.transform = "translate3d(-100%, 0, 0)";
            nodeFooter.style.transform = `translate3d(${container.value.children.length * 100}%, 0, 0)`;
            //* 插入node
            container.value.insertBefore(nodeHeader, childrens.value[0]);
            container.value.appendChild(nodeFooter);
        }
    }
};

// 轮播切换函数
const skip = (number: number, data?: any) => {
    //* 检测是否满足运行条件
    if (!container.value || skipTimer.value) return;
    //* 无限滚动触边处理
    if (define.loop && (number >= childrens.value.length || number < 0)) {
        autoTimer.value && clearInterval(autoTimer.value);
        container.value.style.transition = `all ${delay}s ease-in-out`;
        container.value.style.transform = `translate3d(${number * -100}%, 0, 0)`;
        if (number >= childrens.value.length) {
            //* 分页器设置
            active.value = 0;
            skipTimer.value = setTimeout(() => {
                autoTimer.value = setInterval(() => skip(active.value + 1), define.delay);
                skipTimer.value = undefined;
                //* 检测是否满足运行条件
                if (!container.value) return;
                container.value.style.transition = "none";
                container.value.style.transform = `translate3d(0, 0, 0)`;
            }, delayUp);
        } else {
            //* 分页器设置
            active.value = childrens.value.length - 1;
            skipTimer.value = setTimeout(() => {
                autoTimer.value = setInterval(() => skip(active.value + 1), define.delay);
                skipTimer.value = undefined;
                //* 检测是否满足运行条件
                if (!container.value) return;
                container.value.style.transition = "none";
                container.value.style.transform = `translate3d(-${active.value * 100}%, 0, 0)`;
            }, delayUp);
        }

        return;
    }

    //* 触边处理
    if (number >= childrens.value.length || number < 0) return;
    else {
        active.value = number;
        autoTimer.value && clearInterval(autoTimer.value);
        container.value.style.transition = `all ${delay}s ease-in-out`;
        container.value.style.transform = `translate3d(-${number * 100}%, 0, 0)`;
        skipTimer.value = setTimeout(() => {
            autoTimer.value = setInterval(() => skip(active.value + 1), define.delay);
            skipTimer.value = undefined;
        }, delayUp);
    }
};

// 前进函数
const next = () => skip(active.value + 1);
// 后退函数
const back = () => skip(active.value - 1);

// 侦听器回调函数
const watchStop = watch(
    () => define.autoplay,
    () => {
        autoTimer.value = setInterval(() => skip(active.value + 1), define.delay);
    },
    { immediate: true }
);

// 挂载函数
onMounted(() => init());

// 卸载函数
onBeforeUnmount(() => {
    watchStop && watchStop();
    skipTimer && clearTimeout(skipTimer.value);
    autoTimer && clearInterval(autoTimer.value);
});

// 函数到处
defineExpose({ skip, next, back });
</script>
