<template>
    <div class="ui-carousel ui-multiple-view-carousel" :style="style" ref="main">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-carousel-control ui-carousel-left-control" @click="skip(active - 1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-carousel-control ui-carousel-right-control" @click="skip(active + 1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import Composable from "./composable";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { UiCarouselPropsOption } from "../carousel";

// DOM响应式变量声明
const main = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();

// 响应式变量声明
const active = ref<number>(0);
const controls = ref<boolean>(false);
const skipTimer = ref<NodeJS.Timer>();
const autoTimer = ref<NodeJS.Timer>();

// 获取Props配置
const define = defineProps(UiCarouselPropsOption);

// 静态变量计算
const delay = define.transitionDelay / 1000;
const delayUp = define.transitionDelay * 1.1;

// 实例化组合类
const composable = new Composable(define);

// 计算数据获取
const { style } = composable.computeds;

// 初始化函数
const init = () => {
    //* 获取模块容器失败则取消后续操作
    if (!main.value || !container.value) return;
    //* 初始化临时变量
    if (main.value.clientWidth < container.value.clientWidth) {
        controls.value = true;
        container.value.style.transition = `all ${delay}s ease-in-out`;
    }
};

// 轮播切换函数
const skip = (number: number, data?: any) => {
    //* 检测是否满足运行条件
    if (!main.value || !container.value || skipTimer.value) return;
    //* 判断是否左贴边
    if (number * main.value.clientWidth <= 0) {
        active.value = 0;
        container.value.style.transform = `translate3d(0, 0, 0)`;
        skipTimer.value = setTimeout(() => {
            skipTimer.value = undefined;
        }, delayUp);

        return;
    }

    //* 判断是否右贴边
    if ((number + 1) * main.value.clientWidth >= container.value.clientWidth) {
        active.value = container.value.clientWidth / main.value.clientWidth - 1;
        container.value.style.transform = `translate3d(${active.value * -main.value.clientWidth}px, 0, 0)`;
        skipTimer.value = setTimeout(() => {
            skipTimer.value = undefined;
        }, delayUp);
        return;
    }

    //* 正常运行
    active.value = number;
    container.value.style.transform = `translate3d(${active.value * -main.value.clientWidth}px, 0, 0)`;
    skipTimer.value = setTimeout(() => {
        skipTimer.value = undefined;
    }, delayUp);
};

// 前进函数
const next = () => skip(active.value + 1);
// 后退函数
const back = () => skip(active.value - 1);

// 挂载函数
onMounted(() => init());

// 卸载函数
onBeforeUnmount(() => {
    skipTimer && clearTimeout(skipTimer.value);
    autoTimer && clearInterval(autoTimer.value);
});

// 函数导出
defineExpose({ skip, next, back });
</script>
