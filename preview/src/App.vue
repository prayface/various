<template>
    <div class="app" v-loading="loading">
        <Test></Test>
        <button @click="open('function')">开启遮罩</button>
        <button @click="open('directive')">开启指令遮罩</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { VLoading, $loading } from "various-ui";
import Test from "./component/Test.vue";

const loading = ref(false);
const open = (name) => {
    switch (name) {
        case "directive": {
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 2000);
            break;
        }

        case "function": {
            $loading.open();
            setTimeout(() => {
                $loading.close();
            }, 2000);
            break;
        }
    }
};
</script>

<style lang="less" scoped>
.app {
    width: 100%;
    height: 520px;
    background: #000;
}
</style>
