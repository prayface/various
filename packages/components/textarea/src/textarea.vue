<template>
    <div class="ui-textarea" :class="className" :style="style" ref="main">
        <!-- Input主体 -->
        <textarea class="ui-form-control" v-bind="attrs" v-on="handles" ref="container" resize="none"></textarea>
        <!-- 滚动条容器 -->
        <div class="ui-scrollbar-container ui-scrollbar-vertical" v-show="scrollsize">
            <div class="ui-scrollbar-bar" :style="scrollbarStyle" @mousedown="onMousedown"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject, toRefs, onMounted } from "vue";
import { UiTextareaPropsOption, UiTextareaEmits } from "./textarea";
import { UiFormEmitterKey } from "@various/constants";

import Composable, { UiTextareaConstructorRefs } from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiTextarea",
    emits: UiTextareaEmits,
    props: UiTextareaPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 初始化响应式变量
        const refs = reactive<UiTextareaConstructorRefs>({
            main: undefined,
            container: undefined,
            scrollsize: 0,
            ratio: 0,
            offset: 0,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 挂载函数
        onMounted(() => composable.methods.init());

        //* 导出方法
        expose({ clear: composable.methods.clear });

        return {
            ...composable.handles,
            ...composable.methods,
            ...composable.computeds,
            ...toRefs(refs),
        };
    },
});
</script>
