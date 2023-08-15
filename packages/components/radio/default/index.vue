<template>
    <label class="ui-radio" :class="className">
        <!-- 多选框控制器 -->
        <div class="ui-radio-control">
            <div class="ui-radio-circle"></div>
            <input type="radio" class="ui-radio-input" :value="value" :checked="checked" @change="switchRatio" />
        </div>

        <!-- 多选框文案 -->
        <div class="ui-radio-content">
            <slot>{{ value }}</slot>
        </div>
    </label>
</template>

<script lang="ts" setup>
//* 组件属性
import { UiRadioPropsOption, UiRadioEmits } from "./index";
import { useComposable } from "./src/composable";

//* 注册组件属性
const define = defineProps(UiRadioPropsOption);
const emits = defineEmits(UiRadioEmits);

//* 组合函数
const { methods, computeds } = useComposable(define, emits);
const { switchRatio } = methods;
const { className, checked } = computeds;

//* 注册组件配置
defineOptions({ name: "UiRadio" });
</script>
