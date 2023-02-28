<template>
    <div class="pagination">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiPagination v-model="page" :count="88" :limit="5" />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const page = ref(1);
</script>
