<template>
    <div class="form">
        <section>
            <div class="title">测试表格1</div>
            <div class="descript">
                <p>该模块展示<span>UiTable组件</span>所有功能</p>
            </div>
            <div class="content">
                <UiTable
                    :children="true"
                    :option="option1"
                    :height="600"
                    :ratio="true"
                    :data="data"
                    ratio-index="pubmed_id"
                    children-index="name"
                    @sort="sort">
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

        <section>
            <div class="title">测试表格2</div>
            <div class="content">
                <UiTable :children="true" :option="option2" :height="600" :data="data2" style="width: 700px;">
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
import { useConposable } from "./index";
import { option1, option2, data2 } from "./data.json";

const { refs, methods, computeds } = useConposable();

const { sort } = methods;
const { data } = computeds;
</script>
