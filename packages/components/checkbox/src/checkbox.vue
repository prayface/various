<template>
    <label class="ui-checkbox" :class="className">
        <!-- 多选框控制器 -->
        <div class="ui-checkbox-control">
            <input type="checkbox" class="ui-checkbox-input" :value="value" :checked="checked" :disabled="disabled" @change="trigger" />
            <UiIcon name="success" class="ui-checkbox-icon" />
        </div>

        <!-- 多选框文案 -->
        <div class="ui-checkbox-content">
            <template v-if="$slots.default"><slot></slot></template>
            <template v-else>{{ value }}</template>
        </div>
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiCheckboxEmits, UiCheckboxPropsOption } from "./checkbox";
import Composable from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiCheckbox",
    emits: UiCheckboxEmits,
    props: UiCheckboxPropsOption,
    components: { UiIcon },
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
