<template>
    <div class="ui-textarea" v-loading="loading" :class="className" :style="style" ref="main">
        <!-- Input主体 -->
        <textarea class="ui-form-control" v-bind="attrs" v-on="handles" ref="container" resize="none"></textarea>
        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-textarea-clearable" v-if="clearable && modelValue" @click="clear" />
        <!-- 滚动条容器 -->
        <div class="ui-textarea-scroll" v-show="scrollsize">
            <div class="ui-textarea-scroll-bar" :style="{ height: scrollsize + 'px', transform: `translateY(${offset}px)` }" @mousedown="onMousedown"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject, toRefs,onMounted } from "vue";
import { UiTextareaPropsOption, UiTextareaEmits } from "./textarea";
import { UiFormEmitterKey } from "@various/constants";

import Composable, { UiTextareaConstructorRefs } from "./composable";
import VLoading from "@various/directives/loading";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiTextarea",
    emits: UiTextareaEmits,
    props: UiTextareaPropsOption,
    directives: { VLoading },
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = define.name ? inject(UiFormEmitterKey) : undefined;

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

        onMounted(() => {
            composable.methods.init
        });

        //* 暴露公共方法
        expose({ ...composable.methods });


        return {
            handles: composable.handles,
            ...composable.methods,
            ...composable.computeds,
            ...toRefs(refs),
        };
    },
});
</script>
