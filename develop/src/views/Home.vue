<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>select</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiCascade v-model="value" :width="200" :option="candidates" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const active = ref("");
const candidates = [
    {
        name: "测试选项1",
        value: "test1",
        children: [
            { name: "测试选项1", value: "test1" },
            { name: "测试选项2", value: "test2" },
            { name: "测试选项3", value: "test3" },
        ],
    },
    {
        name: "测试选项2",
        value: "test2",
        children: [
            { name: "测试选项1", value: "test1" },
            { name: "测试选项2", value: "test2" },
            { name: "测试选项3", value: "test3" },
        ],
    },
    {
        name: "测试选项3",
        value: "test3",
        children: [
            { name: "测试选项1", value: "test1" },
            { name: "测试选项2", value: "test2" },
            { name: "测试选项3", value: "test3" },
        ],
    },
    {
        name: "测试选项4",
        value: "test4",
        children: [
            { name: "测试选项1", value: "test1" },
            { name: "测试选项2", value: "test2" },
            { name: "测试选项3", value: "test3" },
        ],
    },
];
</script>
