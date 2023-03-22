<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="hanlders">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="viewVisible" ref="container" :style="style" :class="className" v-on="containerHanlders">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts">
import ComposableFixed, { UiTooltipConstructorRefs } from "./composable.fixed";
import Composable from "./composable";
import { node } from "@various/utils";
import { UiTooltipPropsOption, UiTooltipEmits } from "../tooltip";
import { defineComponent, onBeforeUnmount, reactive, toRefs } from "vue";

export default defineComponent({
    name: "UiTooltip",
    emits: UiTooltipEmits,
    props: UiTooltipPropsOption,
    setup(define, { emit }) {
        //* 初始化响应式变量
        const refs = reactive<UiTooltipConstructorRefs>({
            main: undefined,
            triangle: undefined,
            container: undefined,
            viewVisible: false,
            timer: undefined,
        });

        //* 实例化组合类
        const composable = new Composable(define);
        const composableFixed = new ComposableFixed(refs, define, emit);

        //* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
        onBeforeUnmount(() => {
            composableFixed.watchs.stop && composableFixed.watchs.stop();
            refs.timer && clearTimeout(refs.timer);
            refs.container && node.remove("ui-windows", refs.container);
        });

        return {
            ...composable.computeds,
            hanlders: composableFixed.methods.hanlders(),
            containerHanlders: composableFixed.methods.containerHanlders(),
            ...toRefs(refs),
        };
    },
});
</script>
