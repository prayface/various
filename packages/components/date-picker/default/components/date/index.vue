<template>
    <div class="ui-date-picker-candidate ui-picker-date">
        <!-- * 日期选择器头部 -->
        <div class="ui-date-picker-candidate-header">
            <!-- * 左侧控制器 -->
            <div class="ui-date-picker-candidate-controls ui-date-picker-candidate-left-controls">
                <!-- * 年份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-year-control" @click="changeDate({ year: year - 1 })">
                    <UiIcon name="arrow-double" />
                </div>

                <!-- * 月份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-month-control" @click="changeDate({ month: month - 1 })">
                    <UiIcon name="arrow" />
                </div>
            </div>

            <!-- * 日期年月信息 -->
            <div class="ui-date-picker-candidate-context" @click="changeComponent('month')">
                <!-- * 年份信息 -->
                <div class="ui-date-picker-candidate-year">{{ year }}年</div>
                <!-- * 月份信息 -->
                <div class="ui-date-picker-candidate-month">{{ month + 1 }}月</div>
            </div>

            <!-- * 右侧控制器 -->
            <div class="ui-date-picker-candidate-controls ui-date-picker-candidate-right-controls">
                <!-- * 月份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-month-control" @click="changeDate({ month: month + 1 })">
                    <UiIcon name="arrow" />
                </div>

                <!-- * 年份控制器 -->
                <div class="ui-date-picker-candidate-control ui-date-picker-candidate-year-control" @click="changeDate({ year: year + 1 })">
                    <UiIcon name="arrow-double" />
                </div>
            </div>
        </div>

        <!-- * 日期选择器内容 -->
        <div class="ui-date-picker-candidate-content">
            <div class="ui-date-picker-candidate-content-header">
                <div class="ui-picker-candidate">一</div>
                <div class="ui-picker-candidate">二</div>
                <div class="ui-picker-candidate">三</div>
                <div class="ui-picker-candidate">四</div>
                <div class="ui-picker-candidate">五</div>
                <div class="ui-picker-candidate">六</div>
                <div class="ui-picker-candidate">日</div>
            </div>

            <div class="ui-date-picker-candidate-content-container">
                <template v-for="value in days">
                    <div class="ui-picker-candidate" :class="receiveDayClassName(value.year, value.month, value.day)" @click="changeDay(value)">
                        {{ value.day }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 组件引入
import UiIcon from "@various/components/icon";

//* 组件属性
import { UiPickerEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件属性注册
const emits = defineEmits(UiPickerEmits);

//* 组合函数
const { refs, methods, disposes } = useComposable(emits);
const { days, year, month } = refs;
const { changeComponent, changeDate, changeDay } = methods;
const { init, receiveDayClassName } = disposes;

//* 声明组件配置
defineExpose({ init });
</script>
