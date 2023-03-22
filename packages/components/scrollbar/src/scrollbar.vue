<template>
    <div class="ui-scrollbar" ref="container" :style="style">
        <div class="ui-scrollbar-content" ref="content" :style="stylesContent">
            <slot></slot>
        </div>
        <div class="ui-scrollbar-container ui-scrollbar-x" v-show="scrollbarX.size">
            <div class="ui-scrollbar-bar" :style="stylesScrollbarX" @mousedown="onScroll(true, $event)"></div>
        </div>
        <div class="ui-scrollbar-container ui-scrollbar-y" v-show="scrollbarY.size">
            <div class="ui-scrollbar-bar" :style="stylesScrollbarY" @mousedown="onScroll(false, $event)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Composable, { UiScrollbarConstructorRefs } from "./composable";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { UiScrollbarPropsOption } from "./scrollbar";
export default defineComponent({
    name: "UiScrollbar",
    props: UiScrollbarPropsOption,
    setup(define) {
        //* 初始化响应式变量
        const refs = reactive<UiScrollbarConstructorRefs>({
            container: undefined,
            content: undefined,
            scroll: { real: { top: 0, left: 0 }, abs: { top: 0, left: 0 }, drag: false },
            scrollbarX: { size: 0, offset: 0, drag: false },
            scrollbarY: { size: 0, offset: 0, drag: false },
            real: { width: 0, height: 0, ratioX: 0, ratioY: 0 },
            abs: { width: 0, height: 0, ratioX: 0, ratioY: 0 },
        });

        //* 实例化组合类
        const composable = new Composable(refs, define);

        //* 初始化
        onMounted(() => composable.methods.init());

        return {
            ...composable.computeds,
            ...composable.methods,
            ...toRefs(refs),
        };
    },
});
</script>
