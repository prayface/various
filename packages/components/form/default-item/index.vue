<template>
    <div class="ui-form-item" :class="className">
        <div class="ui-form-name" v-if="label" :style="style">{{ label }}</div>
        <div class="ui-form-container">
            <slot></slot>
            <Transition>
                <div class="ui-form-message" v-if="visible">{{ content }}</div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiFormItemPropsOption } from "./index";
import { useComposable } from "./src/composable";
import { UiTypes } from "@various/constants";
import { onBeforeUnmount } from "vue";

//* 获取组件属性
const define = defineProps(UiFormItemPropsOption);

const { refs, rules, methods, computeds, emitter } = useComposable(define);
const { show, hidden, validator } = methods;
const { visible, content, verifyTimer } = refs;
const { style, className } = computeds;

//* 根据Prop、Emitter和Rule注册响应函数
if (rules && define.prop && rules[define.prop]) {
    emitter?.on(define.prop, async (type: string) => methods.validator(type));
    emitter?.on(`trigger:${define.prop}`, (error: UiTypes.verifyResult) => methods.show(error.message, error.type || "error"));
    emitter?.on(`reset:${define.prop}`, () => methods.hidden());
}

//* 组件销毁时销毁未执行完的定时器
onBeforeUnmount(() => {
    verifyTimer.value && clearTimeout(verifyTimer.value);
});

//* 组件配置
defineOptions({ name: "UiFormItem" });
//* 公共方法导出
defineExpose({ show, hidden, validator });
</script>
