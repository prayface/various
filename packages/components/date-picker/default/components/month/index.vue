<template>
    <div class="ui-date-picker-candidate ui-picker-month">
        <!-- * 月份选择器头部 -->
        <div class="ui-date-picker-candidate-header">
            <!-- * 左侧控制器 -->
            <div class="ui-date-picker-candidate-controls ui-date-picker-candidate-left-controls">
                <!-- * 年份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-year-control" @click="changeDate({ year: year - 1 })">
                    <UiIcon name="arrow-double" />
                </div>
            </div>

            <!-- * 日期年月信息 -->
            <div class="ui-date-picker-candidate-context">
                <!-- * 年份信息 -->
                <div class="ui-date-picker-candidate-year">{{ year }}年</div>
            </div>

            <!-- * 右侧控制器 -->
            <div class="ui-date-picker-candidate-controls ui-date-picker-candidate-right-controls">
                <!-- * 年份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-year-control" @click="changeDate({ year: year + 1 })">
                    <UiIcon name="arrow-double" />
                </div>
            </div>
        </div>

        <!-- * 月期选择器内容 -->
        <div class="ui-date-picker-candidate-content">
            <div class="ui-date-picker-candidate-content-container">
                <template v-for="value in months">
                    <div class="ui-picker-candidate" :class="{ 'ui-active': value == month }" @click="changeMonth(value)">{{ value + 1 }}月</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 组件属性
import { useComposable } from "./src/composable";
import { UiPickerEmits } from "./index";

//* 组件属性注册
const emits = defineEmits(UiPickerEmits);

//* 组合函数
const { refs, methods, disposes } = useComposable(emits);
const { months, month, year } = refs;
const { changeDate, changeMonth } = methods;
const { init } = disposes;

defineExpose({ init });
</script>
