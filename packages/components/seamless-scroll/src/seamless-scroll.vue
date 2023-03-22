<template>
    <div class="ui-seamless-scroll" :style="style" ref="main" @mouseenter="mouseenter" @mouseleave="mouseleave">
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

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted } from "vue";
import { UiSeamlessScrollPropsOption } from "./seamless-scroll";
import Composable, { UiSeamlessScrollConstructorRefs } from "./composable";
export default defineComponent({
    name: "UiSeamlessScroll",
    props: UiSeamlessScrollPropsOption,
    setup(define) {
        //* 初始化响应式变量
        const refs = reactive<UiSeamlessScrollConstructorRefs>({
            main: undefined,
            content: undefined,
            container: undefined,
            offset: 0,
            frame: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define);

        onMounted(() => composable.methods.mouseleave());
        onUnmounted(() => {
            composable.refs.frame && window.cancelAnimationFrame(composable.refs.frame);
        });

        return {
            ...composable.computeds,
            ...composable.methods,
        };
    },
});
</script>
