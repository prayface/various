<template>
    <div class="ui-form-item" :class="className">
        <div class="ui-form-name" v-if="label" :style="style">{{ label }}</div>
        <div class="ui-form-container">
            <slot />
            <Transition>
                <div class="ui-form-message" v-if="visible">{{ content }}</div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, onUnmounted, toRefs } from "vue";
import { UiFormEmitterKey, UiFormRulesKey, UiFormDataKey, UiTypes } from "@various/constants";
import { UiFormItemPropsOption } from "./form-item";
import Composable, { UiFormItemConstructorRefs } from "./composable";

export default defineComponent({
    name: "UiFormItem",
    props: UiFormItemPropsOption,
    setup(define, { expose }) {
        //* 获取emitter和rules数据
        const emitter = define.prop ? inject(UiFormEmitterKey) : null;
        const rules = define.prop ? inject(UiFormRulesKey) || {} : {};
        const data = define.prop ? inject(UiFormDataKey) || {} : {};

        //* 初始化页面数据
        const refs = reactive<UiFormItemConstructorRefs>({
            timer: undefined,
            status: "info",
            content: "",
            visible: false,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, { rules, data });

        //* 公共方法
        const methods = composable.methods;

        //* 根据prop、emitter和rule注册响应函数
        if (rules && define.prop && rules[define.prop]) {
            emitter?.on(define.prop, async (type: string) => methods.verify(type));
            emitter?.on(`trigger:${define.prop}`, (error: UiTypes.verifyResult) => methods.trigger(error.message, error.type || "error"));
            emitter?.on(`reset:${define.prop}`, () => methods.hidden());
        }

        //* 暴露方法
        expose({ ...methods });

        //* 组件销毁时销毁未执行完的定时器
        onUnmounted(() => {
            refs.timer && clearTimeout(refs.timer);
        });

        return {
            ...toRefs(refs),
            ...composable.computeds,
        };
    },
});
</script>
