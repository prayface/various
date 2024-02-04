<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiTable :option="option1" :data="data1" :children="true" children-index="name" ref="table3">
                    <template #children>
                        <span>子列表1</span>
                        <span>子列表2</span>
                        <span>子列表3</span>
                        <span>子列表4</span>
                        <span>子列表5</span>
                        <span>子列表6</span>
                        <span>子列表7</span>
                        <span>子列表8</span>
                        <span>子列表9</span>
                    </template>
                </UiTable>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const data1 = [
    {
        name: "黄黄黄黄杯",
        year: "2023",
        price: "100",
        inventory: "123000",
        detail: "这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子",
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

const option1 = [
    { key: "name", name: "名字" },
    { key: "year", name: "年份" },
    { key: "price", name: "价格" },
    { key: "inventory", name: "库存" },
    { key: "detail", name: "描述" },
];
</script>
