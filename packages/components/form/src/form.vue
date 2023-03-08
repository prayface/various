<template>
    <form class="ui-form" ref="form">
        <slot></slot>
    </form>
</template>

<script lang="ts" setup>
import mitt from "mitt";
import { provide, ref } from "vue";
import { UiFormType, UiFormRulesKey, UiFormVerifyResult } from "./form";
import { UiFormEmitterKey, UiFormDataKey } from "@various/constants";

const emitter = mitt();
const define = defineProps(UiFormType);
const form = ref<HTMLFormElement | undefined>();

//* 表单校验函数
const validator = async (cb: (result: boolean) => void) => {
    if (define.rules) {
        //* 1. 初始化数据
        const errors: { name: string; result: UiFormVerifyResult }[] = [];

        //* 2. 遍历生成校验队列
        for (const i in define.rules) {
            //* 2.1 初始化校验队列
            const alignment: (Promise<UiFormVerifyResult> | UiFormVerifyResult)[] = [];
            //* 2.2 添加校验
            define.rules[i].forEach((value) => alignment.push(value.verify(define.data)));
            //* 2.3 获取校验结果
            const result = await Promise.all(alignment);
            //* 2.4 获取校验失败列表
            const error = result.filter((value) => (!value.type || value.type == "error") && !value.verify);
            //* 2.5 存在校验失败则添加入队列中
            if (error && error.length) {
                errors.push({ name: i, result: error[0] });
            }
        }

        //* 3. 根据是否存在校验失败选择触发提示or触发回调函数
        if (errors.length) {
            errors.forEach((error) => emitter.emit(`trigger:${error.name}`, error.result));
            cb && cb(false);
        } else {
            cb && cb(true);
        }
    }
};

//* 表单重置函数
const reset = () => {
    for (const i in define.rules) {
        emitter.emit(`reset:${i}`);
    }
};

provide(UiFormEmitterKey, emitter);
provide(UiFormDataKey, define.data);
provide(UiFormRulesKey, define.rules);
defineExpose({
    validator,
    reset,
});
</script>
