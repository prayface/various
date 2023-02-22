<template>
    <div class="ui-carousel" :style="styles" ref="main" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="ui-carousel-container" ref="container">
            <slot />
        </div>

        <div class="ui-carousel-control ui-carousel-left-control" @click="skip(active - 1)">
            <UiIcon name="arrow" />
        </div>
        <div class="ui-carousel-control ui-carousel-right-control" @click="skip(active + 1)">
            <UiIcon name="arrow" />
        </div>

        <div class="ui-carousel-schedules">
            <div class="ui-carousel-schedule" v-for="(schedule, index) in schedules" :key="index" :class="{ active: index == active }" @click="skip(index)"></div>
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
const skip = (index: number) => {
    //* 判断是否向下执行
    if (index == active.value || !container.value || skipTimer) return;
    //* 边界值处理
    if (define.loop && schedules.length > 2 && index < 0) {
        //* 当前激活的Key初始化
        const key = schedules.length - 1;
        //* 触发跳转动画
        skipSet(key, 1, true);
        //* 变量值初始化
        active.value = key;
        skipTimer = setTimeout(() => {
            skipTimer = undefined;
            skipSet(key, 1, false);
        }, 300);
    } else if (define.loop && schedules.length > 2 && index >= schedules.length) {
        //* 触发跳转动画
        skipSet(0, schedules.length, true);
        //* 变量值设置
        active.value = 0;
        skipTimer = setTimeout(() => {
            skipTimer = undefined;
            skipSet(0, 0, false);
        }, 300);
    } else if (index >= 0 && index <= schedules.length) {
        active.value = index;
        container.value.style.transition = `all 0.5s ease-in-out`;
        container.value.style.transform = `translate(-${active.value * 100}%, 0)`;
        skipTimer = setTimeout(() => {
            skipTimer = undefined;
        }, 300);
    }
};

//* 跳转样式设置
const skipSet = (key: number, number: number, animation: boolean) => {
    //* 判断是否向下执行
    if (!container.value || !schedules[key]) return;
    //* 是否需要添加过渡效果
    if (animation) container.value.style.transition = "all 0.5s ease-in-out";
    else container.value.style.transition = "none";
    //* 触发样式变更
    schedules[key].style.transform = `translate(${number * 100}%, 0)`;
    container.value.style.transform = `translate(-${number * 100}%, 0)`;
};

//* 鼠标移入停止自动播放
const mouseenter = () => {
    timer && clearInterval(timer);
};

//* 鼠标移出开始自动播放
const mouseleave = () => {
    timer && clearInterval(timer);
    if (define.autoplay) {
        timer = setInterval(() => {
            skip(active.value + 1);
        }, define.delay);
    }
};

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
</script>
