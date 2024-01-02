<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiRegionSelector v-model="value" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref([]);
const placeholder = ref("");
const disabled = ref(false);
const width = ref(200);
</script>
