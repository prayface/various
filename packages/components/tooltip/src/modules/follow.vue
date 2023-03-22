<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="hanlders">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="viewVisible" ref="container" :style="style" :class="className" v-on="containerHanlders">
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts">
import ComposableFollow, { UiTooltipConstructorRefs } from "./composable.follow";
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
        const composableFollow = new ComposableFollow(refs, define, emit);

        //* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
        onBeforeUnmount(() => {
            composableFollow.watchs.stop && composableFollow.watchs.stop();
            refs.timer && clearTimeout(refs.timer);
            refs.container && node.remove("ui-windows", refs.container);
        });

        return {
            ...composable.computeds,
            hanlders: composableFollow.methods.hanlders(),
            containerHanlders: composableFollow.methods.containerHanlders(),
            ...toRefs(refs),
        };
    },
});
</script>
