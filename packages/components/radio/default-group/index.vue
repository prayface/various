<template>
    <div class="ui-radio-group">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
//* 按需导入插件
import { provide, inject } from "vue";

//* 组件属性
import { UiRadioGroupEmits, UiRadioGroupPropsOption, UiRadioGroupInjectionKey } from "./index";

//* 全局属性
import { UiFormEmitterKey } from "@various/constants";

//* 注册组件属性
const define = defineProps(UiRadioGroupPropsOption);
const emits = defineEmits(UiRadioGroupEmits);

//* 初始化mitt
const emitter = inject(UiFormEmitterKey, undefined);

//* 属性注入
provide(UiRadioGroupInjectionKey, {
    define,
    change: (value: any) => {
        //* 数据更新
        emits("update:modelValue", value);
        //* 响应事件
        emits("change");
        emitter?.emit(define.name || "", "change");
    },
});

//* 注册组件配置
defineOptions({ name: "UiRadioGroup" });
</script>
