<template>
    <div class="container">
        <UiDatePicker v-model="date1" mode="month" placeholder="开始时间" @change="change('start')" />
        <UiDatePicker v-model="date2" mode="month" placeholder="截止时间" @change="change('end')" :disabled="detection" />
    </div>
</template>

<script setup>
import { ref } from "vue";

const date1 = ref("");
const date2 = ref("");

//* 截止时间禁用检测函数
const detection = (date) => {
    //* 初始化开始日期
    const start = new Date(date1.value);

    //* 初始化年月
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    //* 判断并返回
    return startYear > currentYear || (startYear == currentYear && startMonth >= currentMonth);
};

//* 数值检测
const change = (type) => {
    //* 初始化开始与结束日期
    const start = new Date(date1.value);
    const end = new Date(date2.value);

    if (start.getTime() >= end.getTime()) {
        if (type == "end") {
            date1.value = "";
            return;
        }

        if (type == "start") {
            date2.value = "";
            return;
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    .ui-date-picker {
        width: 240px;
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
}
</style>
