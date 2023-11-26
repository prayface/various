<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiDatePicker v-model="value" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref();
const value = ref("");
const candidates = ref([]);

const trigger = () => {
    const number = candidates.value.length + 1;
    if (number > 10) {
        candidates.value = [
            { label: "测试选项1", value: "test1" },
            { label: "测试选项2", value: "test2" },
            { label: "测试选项3", value: "test3" },
            { label: "测试选项4", value: "test4" },
        ];
    } else {
        candidates.value.push({ label: "测试选项" + number, value: "test" + number });
    }
};

const blur = () => {};

const change = () => {};
</script>
