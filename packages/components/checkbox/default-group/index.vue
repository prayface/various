<template>
    <div class="ui-checkbox-group">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiFormEmitterKey } from "@various/constants";
import { UiCheckboxGroupInjectionKey, UiCheckboxGroupPropsOption, UiCheckboxGroupEmits } from "./index";
import { useComposable } from "./src/composable";
import { provide, inject } from "vue";

//* 获取组件属性
const emitter = inject(UiFormEmitterKey, undefined);
const define = defineProps(UiCheckboxGroupPropsOption);
const emits = defineEmits(UiCheckboxGroupEmits);

const { methods, values } = useComposable(define, emits);

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
        emits("change");
        emitter?.emit(define.name || "", "change");
    },
});

//* 导出函数
defineExpose({ switchMode: methods.switchMode });
//* 组件配置
defineOptions({ name: "UiCheckboxGroup" });
</script>
