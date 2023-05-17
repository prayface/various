<template>
    <div class="ui-radio-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from "vue";
import { UiRadioGroupEmits, UiRadioGroupPropsOption, UiRadioGroupInjectionKey } from "./radio-group";
import { UiFormEmitterKey } from "@various/constants";

export default defineComponent({
    name: "UiRadioGroup",
    emits: UiRadioGroupEmits,
    props: UiRadioGroupPropsOption,
    setup(define, { emit }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 将Group组件的Props注入子组件中
        provide(UiRadioGroupInjectionKey, {
            define,
            change: (value: any) => {
                //* 数据更新
                emit("update:modelValue", value);

                //* 响应事件
                emit("change");
                emitter?.emit(define.name || "", "change");
            },
        });

        return {};
    },
});
</script>
