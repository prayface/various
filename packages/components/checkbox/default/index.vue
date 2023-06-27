<template>
    <label class="ui-checkbox" :class="className">
        <!-- 多选框控制器 -->
        <div class="ui-checkbox-control">
            <input type="checkbox" class="ui-checkbox-input" :value="value" :checked="checked" :disabled="disabled" @change="switchData" />
            <UiIcon name="success" class="ui-checkbox-icon" />
        </div>

        <!-- 多选框文案 -->
        <div class="ui-checkbox-content">
            <slot>{{ value }}</slot>
        </div>
    </label>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiCheckboxPropsOption, UiCheckboxEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件引入
import UiIcon from "@various/components/icon";

//* 获取组件属性
const define = defineProps(UiCheckboxPropsOption);
const emits = defineEmits(UiCheckboxEmits);

const { methods, computeds } = useComposable(define, emits);
const { checked, disabled, className } = computeds;
const { switchData } = methods;

//* 组件配置
defineOptions({ name: "UiCheckbox" });
</script>
