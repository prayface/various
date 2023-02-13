<template>
    <div>
        <UiButton ref="main">按钮</UiButton>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const main = ref(null);

onMounted(() => {
    console.log(main.value.on);
});
</script>
