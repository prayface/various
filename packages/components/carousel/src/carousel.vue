<template>
    <div class="ui-carousel" :style="styles" ref="main">
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <div class="ui-carousel-control ui-carousel-left-control" @click="skip(active - 1)">
            <UiIcon name="arrow" />
        </div>
        <div class="ui-carousel-control ui-carousel-right-control" @click="skip(active + 1)">
            <UiIcon name="arrow" />
        </div>

        <div class="ui-carousel-schedules">
            <template v-for="(schedule, index) in schedules" :key="index">
                <div class="ui-carousel-schedule" :class="{ active: index == active }" @click="skip(index, schedule)"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import _ from "lodash";
import { ref, watch, reactive, computed, onMounted, onUnmounted } from "vue";
import { UiCarouselType } from "./carousel";

const main = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();

const define = defineProps(UiCarouselType);
const styles = computed(() => {
    if (_.isNumber(define.height)) return { height: define.height + "px" };
    else return { height: define.height };
});

//* 响应式变量
const active = ref<number>(0);
const schedules = reactive<HTMLElement[]>([]);
//* 静态变量
let timer: NodeJS.Timer | undefined = undefined;
let skipTimer: NodeJS.Timer | undefined = undefined;

//* 跳转函数
const skip = (index: number, data?: any) => {
    //* 判断是否向下执行
    if (index == active.value || !container.value || skipTimer) return;
    //* 边界值处理
    if (define.loop && schedules.length > 2 && index < 0) {
        //* 当前激活的Key初始化
        const key = schedules.length - 1;
        //* 触发跳转动画
        skipSet(key, -1);
        //* 变量值初始化
        active.value = key;
    } else if (define.loop && schedules.length > 2 && index >= schedules.length) {
        //* 触发跳转动画
        skipSet(0, schedules.length);
        //* 变量值设置
        active.value = 0;
    } else if (index >= 0 && index <= schedules.length) {
        active.value = index;
        container.value.style.transition = `all 0.5s ease-in-out`;
        container.value.style.transform = `translate(-${active.value * 100}%, 0)`;
        skipTimer = setTimeout(() => {
            skipTimer = undefined;
        }, 500);
    }
};

//* 跳转样式设置
const skipSet = (key: number, number: number) => {
    //* 判断是否向下执行
    if (!container.value || !schedules[key]) return;
    //* 克隆节点
    const dom = schedules[key].cloneNode(true) as HTMLElement;
    //* 设置克隆节点的样式
    dom.style.transform = `translate(${number * 100}%, 0)`;
    //* 将节点添加入DOM容器中
    container.value.appendChild(dom);
    //* 添加过渡效果
    container.value.style.transition = "all 0.5s ease-in-out";
    //* 添加样式触发过渡效果
    container.value.style.transform = `translate(${number * -100}%, 0)`;
    //* 过渡结束移出克隆节点
    skipTimer = setTimeout(() => {
        //* 释放定时器内存
        skipTimer = undefined;
        //* 判断是否可向下执行
        if (!container.value) return;
        //* 取消过渡样式
        container.value.style.transition = "none";
        //* 回归正确位置
        container.value.style.transform = `translate(${key * -100}%, 0)`;
        //* 移出克隆节点
        container.value.removeChild(dom);
    }, 500);
};

// //* 鼠标移入停止自动播放
// const mouseenter = () => {
//     timer && clearInterval(timer);
// };

// //* 鼠标移出开始自动播放
// const mouseleave = () => {
//     timer && clearInterval(timer);
//     if (define.autoplay) {
//         timer = setInterval(() => {
//             skip(active.value + 1);
//         }, define.delay);
//     }
// };

//* 侦听器
const stop = watch(
    () => define.autoplay,
    () => {
        timer && clearInterval(timer);
        if (define.autoplay) {
            timer = setInterval(() => {
                skip(active.value + 1);
            }, define.delay);
        }
    },
    {
        immediate: true,
    }
);

//* DOM挂载之后给每个模块添加偏移
onMounted(() => {
    //* 获取模块容器失败则取消后续操作
    if (!container.value || !container.value?.children?.length) return;
    //* 遍历子模块, 设置初始偏移
    for (let i = 0; i < container.value.children.length; i++) {
        const node = container.value.children[i] as HTMLElement;
        node.style.transform = `translate(${i * 100}%, 0)`;
        schedules.push(node);
    }
});

//* 协助侦听器与定时器
onUnmounted(() => {
    stop && stop();
    timer && clearInterval(timer);
});

defineExpose({
    skip: skip,
    next: () => skip(active.value + 1),
    back: () => skip(active.value - 1),
});
</script>
