<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>该模块展示<span>UiTable组件</span>所有功能</p>
            </div>
            <div class="content">
                <UiTable
                    :children="true"
                    :option="option1"
                    :height="600"
                    :ratio="true"
                    :data="[]"
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
    </div>
</template>

<script setup>
import { useConposable } from "./index";
import { option1 } from "./data.json";

const { refs, methods, computeds } = useConposable();

const { sort } = methods;
const { data } = computeds;
</script>
