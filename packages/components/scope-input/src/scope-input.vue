<template>
    <div class="ui-scope-input" :class="className" :style="style">
        <div class="ui-form-control">
            <input class="ui-scope-input-control" type="number" v-on="handles" ref="start" v-bind="attrs.start" v-model="modelValue.start" />
            <div class="ui-scope-input-line"></div>

            <input class="ui-scope-input-control" type="number" v-on="handles" ref="end" v-bind="attrs.end" v-model="modelValue.end" />
        </div>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from "vue";
import { UiScopeInputEmits, UiScopeInputPropsOption } from "./scope-input";
import { UiFormEmitterKey } from "@various/constants";
import Composable, { UiScopeInputConstructorRefs } from "./composable";

export default defineComponent({
    name: "UiScopeInput",
    emits: UiScopeInputEmits,
    props: UiScopeInputPropsOption,
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        // TODO 这东西好像写了又好像没写
        //* 初始化响应式变量
        const refs = reactive<UiScopeInputConstructorRefs>({
            start: undefined,
            end: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 导出方法
        expose({ clear: composable.methods.clear });

        return {
            ...composable.computeds,
            ...composable.handles,
            ...composable.methods,
            ...toRefs(refs),
        };
    },
});
</script>
