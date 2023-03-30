<template>
    <div class="ui-checkbox-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from "vue";
import { UiCheckboxGroupEmits, UiCheckboxGroupPropsOption, UiCheckboxGroupInjectionKey } from "./checkbox-group";
import { UiFormEmitterKey } from "@various/constants";

export default defineComponent({
    name: "UiCheckboxGroup",
    emits: UiCheckboxGroupEmits,
    props: UiCheckboxGroupPropsOption,
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 初始化数据列表
        const values: any[] = [];

        //* 触发函数
        const trigger = (mode: "all" | "cancel" | "reverse") => {
            switch (mode) {
                case "all": {
                    define.modelValue.push(...values.filter((value) => !define.modelValue.includes(value)));
                    break;
                }

                case "cancel": {
                    define.modelValue.splice(0, define.modelValue.length);
                    break;
                }

                case "reverse": {
                    //* 获取未选中列表
                    const result = values.filter((value) => !define.modelValue.includes(value));
                    //* 清空已选中列表
                    define.modelValue.splice(0, define.modelValue.length);
                    //* 将未选择列表填入已选中列表中
                    define.modelValue.push(...result);
                    break;
                }
            }
        };

        //* 将Group组件的Props注入子组件中
        provide(UiCheckboxGroupInjectionKey, {
            define,
            values,
            change: (value: any) => {
                //* 数据更新
                const index = define.modelValue.findIndex((val) => val == value);
                if (index != -1) {
                    define.modelValue.splice(index, 1);
                } else {
                    define.modelValue.push(value);
                }

                //* 响应事件
                emit("change");
                emitter?.emit(define.name || "", "change");
            },
        });

        //* 导出函数
        expose({ trigger });

        return { trigger };
    },
});
</script>
