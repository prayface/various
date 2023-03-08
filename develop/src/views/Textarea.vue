<template>
    <div class="textarea">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiTextarea v-model="value" :height="200" />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref("");
</script>
