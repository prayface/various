<template>
    <div class="ui-input" v-loading="loading" :class="className" :style="style" ref="main">
        <!-- Input主体 -->
        <input class="ui-form-control" v-bind="attrs" v-on="handles" />
        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-input-clearable" v-if="clearable && modelValue" @click="clear" />
        <!-- 候选项 -->
        <Transition>
            <div class="ui-form-candidates" v-if="visible" ref="container">
                <div class="ui-form-candidates-triangle" ref="triangle"></div>
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate" v-for="(value, index) in candidates" :key="index" :class="{ 'ui-active': value.value == modelValue }" @mousedown="cutCandidate(value.value, $event)">
                        {{ value.label }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, toRefs } from "vue";
import { UiInputPropsOption, UiInputEmits } from "./input";
import { UiFormEmitterKey } from "@various/constants";
import Composable, { UiInputConstructorRefs } from "./composable";
import VLoading from "@various/directives/loading";

export default defineComponent({
    name: "UiInput",
    emits: UiInputEmits,
    props: UiInputPropsOption,
    directives: { VLoading },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = define.name ? inject(UiFormEmitterKey) : undefined;

        //* 初始化响应式变量
        const refs = reactive<UiInputConstructorRefs>({
            main: undefined,
            visible: false,
            triangle: undefined,
            container: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 暴露公共方法
        expose({ show: composable.methods.show, hidden: composable.methods.hidden, clear: composable.methods.clear });

        return {
            clear: composable.methods.clear,
            handles: composable.handles,
            cutCandidate: composable.methods.cutCandidate,
            ...composable.computeds,
            ...toRefs(refs),
        };
    },
});
</script>
