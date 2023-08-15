<template>
    <div class="ui-steps-input" :style="{ width: width + 'px' }">
        <div class="ui-steps-container" :style="style" :class="{ 'ui-active': currentPage == 'start' }">
            <input type="number" class="ui-form-control ui-steps-control" v-model="modelValue.start" v-bind="startAttrs" v-on="startOns" />
            <input type="number" class="ui-form-control ui-steps-number" v-model="modelValue['start-steps']" v-on="startOns" />
        </div>
        <div class="ui-steps-container" :style="style" :class="{ 'ui-active': currentPage == 'end' }">
            <input type="number" class="ui-form-control ui-steps-control" v-model="modelValue.end" v-bind="endAttrs" v-on="endOns" />
            <input type="number" class="ui-form-control ui-steps-number" v-model="modelValue['end-steps']" v-on="endOns" />
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 组件属性
import { UiStepsInputPropsOption, UiStepsInputEmits } from "./index";
import { useComposable } from "./src/composable";

//* 注册组件属性
const define = defineProps(UiStepsInputPropsOption);
const emits = defineEmits(UiStepsInputEmits);

//* 组合函数
const { refs, computeds } = useComposable(define, emits);
const { currentPage } = refs;
const { style, endOns, endAttrs, startOns, startAttrs } = computeds;

//* 注册化组件配置
defineOptions({ name: "UiStepsInput" });
</script>
