<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="mainHandles">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="viewVisible" ref="container" :style="style" :class="className" v-on="containerHandles">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts">
import ComposableDefault, { UiTooltipConstructorRefs } from "./composable.fixed";
import Composable from "./composable";
import { node } from "@various/utils";
import { UiTooltipPropsOption } from "../tooltip";
import { defineComponent, onBeforeUnmount, reactive, toRefs } from "vue";

export default defineComponent({
    name: "UiTooltip",
    props: UiTooltipPropsOption,
    setup(define) {
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
        const composableDefault = new ComposableDefault(refs, define);

        //* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
        onBeforeUnmount(() => {
            refs.timer && clearTimeout(refs.timer);
            refs.container && node.remove("ui-windows", refs.container);
            composableDefault.watchs.stop && composableDefault.watchs.stop();
        });

        return {
            ...composable.computeds,
            ...composableDefault.handles,
            ...toRefs(refs),
        };
    },
});
</script>
