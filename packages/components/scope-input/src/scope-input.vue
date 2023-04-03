<template>
    <div class="ui-scope-input" :class="className" :style="style">
        <div class="ui-form-control">
            <input class="ui-scope-input-control" type="number" data-type="start" v-model="modelValue.start" v-bind="attrs"
                :placeholder="attrs.placeholder.start" v-on="handles" />
            <div class="ui-scope-input-line"></div>

            <input class="ui-scope-input-control" type="number" data-type="end" v-model="modelValue.end" v-bind="attrs"
                :placeholder="attrs.placeholder.end" v-on="handles" />

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
import { defineComponent, inject } from "vue";
import { UiScopeInputEmits, UiScopeInputPropsOption } from "./scope-input";
import { UiFormEmitterKey } from "@various/constants";
import Composable from "./composable";

export default defineComponent({
    name: "UiScopeInput",
    emits: UiScopeInputEmits,
    props: UiScopeInputPropsOption,
    setup(define, { emit, expose }) {

        console.log(define);
        console.log(typeof define.modelValue);

        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 实例化组合函数
        const composable = new Composable(define, emit, emitter);

        expose({ clear: composable.methods.clear });

        return {
            ...composable.computeds,
            ...composable.handles,
            ...composable.methods,
        };

    },
});
</script>
