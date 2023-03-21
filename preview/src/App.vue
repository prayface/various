<template>
    <div class="app" v-loading="true">
        <UiButton @click="$message.success('哈哈哈', undefined)">查看消息</UiButton>
    </div>
</template>

<script lang="ts" setup>
import { $message, UiButton, VLoading as vLoading } from "various-ui";
</script>

<style lang="less" scoped>
.app {
    width: 100%;
    height: 520px;
    background: #000;
}
</style>
