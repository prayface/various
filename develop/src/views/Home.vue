<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiInput v-model="value" :width="width" :disabled="disabled" :placeholder="placeholder" />

                <button @click="placeholder = '121212'">更改提示语</button>
                <button @click="width = 300">更改宽度</button>
                <button @click="disabled = !disabled">更改状态</button>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const placeholder = ref("");
const disabled = ref(false);
const width = ref(200);
</script>
