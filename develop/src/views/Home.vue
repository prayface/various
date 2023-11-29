<template>
    <div class="tooltip">
        <section class="tooltip-1">
            <div class="title">基础用法</div>
            <div class="descript">
                <p>在这里我们提供<span>固定模式(UiTooltip)</span>和<span>跟随模式(UiTooltipFollow)</span>两种展示方式, 你可根据需求选择不同模式</p>
                <p><span class="warn">注</span>固定模式下以下属性将失效: <span>offsetX</span>、<span>offsetY</span></p>
                <p><span class="warn">注</span>跟随模式下以下属性将失效: <span>direction</span>、<span>trigger</span>、<span>align</span></p>
            </div>
            <div class="content">
                <UiTable :option="option1" :data="data1" :height="298" :overflow="true"></UiTable>
            </div>
        </section>
    </div>
</template>

<script setup>
const option1 = [
    { key: "name", name: "名字" },
    { key: "year", name: "年份" },
    { key: "price", name: "价格" },
    { key: "inventory", name: "库存" },
    { key: "detail", name: "描述" },
];

const data1 = [
    {
        name: "黄黄黄黄杯",
        year: "2023",
        price: "100",
        inventory: "123000",
        detail: "这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子",
    },
    {
        name: "红红杯",
        year: "2000",
        price: "1",
        inventory: "999000",
        detail: "这是一个红红的杯子",
    },
    {
        name: "蓝蓝杯",
        year: "2023",
        price: "100",
        inventory: "5000000",
        detail: "这是一个蓝蓝的杯子",
    },
    {
        name: "不锈钢钢钢",
        year: "1890",
        price: "9999",
        inventory: "10",
        detail: "这是一个不锈钢的杯子",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory: "1",
        detail: "这是一个拉菲",
    },
    {
        name: "黄黄黄黄杯",
        year: "2023",
        price: "100",
        inventory: "123000",
        detail: "这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子",
    },
    {
        name: "红红杯",
        year: "2000",
        price: "1",
        inventory: "999000",
        detail: "这是一个红红的杯子",
    },
    {
        name: "蓝蓝杯",
        year: "2023",
        price: "100",
        inventory: "5000000",
        detail: "这是一个蓝蓝的杯子",
    },
    {
        name: "不锈钢钢钢",
        year: "1890",
        price: "9999",
        inventory: "10",
        detail: "这是一个不锈钢的杯子",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory: "1",
        detail: "这是一个拉菲",
    },
];
</script>
