<template>
    <div class="ui-form-item" :class="className">
        <div class="ui-form-name" v-if="label" :style="styles">{{ label }}</div>
        <div class="ui-form-container">
            <slot />
            <Transition>
                <div class="ui-form-message" v-if="visible">{{ content }}</div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UiTypes, UiFormDataKey, UiFormEmitterKey } from "@various/constants";
import { inject, onUnmounted, ref } from "vue";
import { UiFormRulesKey, UiFormItemType, UiFormVerifyResult } from "../form";
import useComputeds from "./useComputeds";
import useUtils from "./useUtils";

//* 获取Props、emitter和rules数据
const define = defineProps(UiFormItemType);
const emitter = define.prop ? inject(UiFormEmitterKey) : null;
const rules = define.prop ? inject(UiFormRulesKey) || {} : {};
const data = define.prop ? inject(UiFormDataKey) || {} : {};

//* 初始化页面数据
const status = ref<UiTypes.type>("info");

//* 计算属性与工具函数获取
const { className, styles } = useComputeds(define, status);
const { timer, content, visible, trigger, hidden, verify } = useUtils(define, rules, data, status);

//* 根据prop、emitter和rule注册响应函数
if (rules && define.prop && rules[define.prop]) {
    emitter?.on(define.prop, async (type: string) => verify(type));
    emitter?.on(`trigger:${define.prop}`, (error: UiFormVerifyResult) => trigger(error.message, error.type || "error"));
    emitter?.on(`reset:${define.prop}`, () => hidden());
}

//* 暴露隐藏函数与触发函数
defineExpose({ hidden, trigger });
//* 组件销毁时销毁未执行完的定时器
onUnmounted(() => {
    timer.value && clearTimeout(timer.value);
});
</script>
