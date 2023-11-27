<template>
    <form class="ui-form" ref="form">
        <slot></slot>
    </form>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiFormPropsOption } from "./index";
import { useComposable } from "./src/composable";
import { UiFormDataKey, UiFormRulesKey, UiFormEmitterKey } from "@various/constants";
import { provide } from "vue";

//* 获取组件属性
const define = defineProps(UiFormPropsOption);

const { refs, methods, emitter } = useComposable(define);
const { reset, clear, validator } = methods;
const { form } = refs;

//* 数据注入
provide(UiFormEmitterKey, emitter);
provide(UiFormDataKey, define.data);
provide(UiFormRulesKey, define.rules);

//* 组件配置
defineOptions({ name: "UiForm" });
//* 公共方法导出
defineExpose({ reset, clear, validator });
</script>
