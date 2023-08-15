<template>
    <div class="ui-carousel-seamless" :style="style" ref="main" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="ui-carousel-seamless-container" ref="container">
            <div class="ui-carousel-seamless-content" ref="content">
                <slot></slot>
            </div>
            <div class="ui-carousel-seamless-content ui-carousel-seamless-copy-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 按需导入的插件
import { onBeforeUnmount, onMounted } from "vue";

//* 组件属性
import { UiCarouselSeamlessPropsOption } from "./index";
import { useComposable } from "./src/composable";

//* 注册组件属性
const define = defineProps(UiCarouselSeamlessPropsOption);

//* 组合属性
const { refs, methods, computeds } = useComposable(define);
const { main, content, container } = refs;
const { mouseenter, mouseleave } = methods;
const { style } = computeds;

onMounted(() => mouseleave());
onBeforeUnmount(() => {
    refs.frame.value && window.cancelAnimationFrame(refs.frame.value);
});
</script>
