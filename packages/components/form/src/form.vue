<template>
    <form class="ui-form" ref="form">
        <slot></slot>
    </form>
</template>

<script lang="ts">
import _ from "lodash";
import mitt from "mitt";
import { defineComponent, reactive, provide, toRefs } from "vue";
import { UiFormDataKey, UiFormRulesKey, UiFormEmitterKey } from "@various/constants";
import { UiFormPropsOption } from "./form";
import Composable, { UiFormConstructorRefs } from "./composable.form";

export default defineComponent({
    name: "UiForm",
    props: UiFormPropsOption,
    setup(define, { expose }) {
        //* 初始化数据
        const emitter = mitt();
        const refs = reactive<UiFormConstructorRefs>({
            form: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emitter);

        //* 数据注入
        provide(UiFormEmitterKey, emitter);
        provide(UiFormDataKey, define.data);
        provide(UiFormRulesKey, define.rules);

        //* 公共方法导出
        expose({ ...composable.methods });

        return { ...toRefs(refs), ...composable.methods };
    },
});
</script>
