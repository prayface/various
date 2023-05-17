<template>
    <label class="ui-radio" :class="className">
        <!-- 多选框控制器 -->
        <div class="ui-radio-control">
            <div class="ui-radio-circle"></div>
            <input type="radio" class="ui-radio-input" :value="value" :checked="checked" @change="trigger" />
        </div>

        <!-- 多选框文案 -->
        <div class="ui-radio-content">
            <slot>{{ value }}</slot>
        </div>
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiRadioEmits, UiRadioPropsOption } from "./radio";
import Composable from "./composable";

export default defineComponent({
    name: "UiRadio",
    emits: UiRadioEmits,
    props: UiRadioPropsOption,
    setup(define, { emit }) {
        //* 实例化组合函数
        const composable = new Composable(define, emit);

        return {
            ...composable.methods,
            ...composable.computeds,
        };
    },
});
</script>
