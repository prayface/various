<template>
    <div class="ui-seamless-scroll" :style="styles" ref="main" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="ui-seamless-scroll-container" ref="container">
            <div class="ui-seamless-scroll-content" ref="content">
                <slot />
            </div>
            <div class="ui-seamless-scroll-content ui-seamless-scroll-copy-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { UiSeamlessScrollType } from "./seamless-scroll";

let offset = 0;
let frame: null | number = null;

const container = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const main = ref<HTMLDivElement>();

const define = defineProps(UiSeamlessScrollType);
const styles = computed(() => {
    if (_.isNumber(define.height)) return { height: define.height + "px" };
    else return { height: define.height };
});

const animation = () => {
    //* 判断是否向下执行
    if (!container.value || !content.value || !main.value) return;
    if (offset >= content.value.offsetWidth) {
        offset = 0;
    } else {
        offset += define.delay;
    }

    //* 绘制
    container.value.style.transform = `translateX(-${offset}px)`;
    //* 触发下一帧绘制
    frame = window.requestAnimationFrame(animation);
};

const mouseenter = () => {
    frame && window.cancelAnimationFrame(frame);
};

const mouseleave = () => {
    //* 判断是否向下执行
    if (!container.value || !content.value || !main.value) return;
    //* 判断是否达到无缝滚动条件
    if (content.value.offsetWidth > main.value.offsetWidth) {
        frame = window.requestAnimationFrame(animation);
    }
};

onMounted(() => mouseleave());
onUnmounted(() => {
    frame && window.cancelAnimationFrame(frame);
});
</script>
