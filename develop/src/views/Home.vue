<template>
    <div>
        <UiDatePicker v-model="date1" style="width: 240px" />
        <UiDatePicker v-model="date2" style="width: 240px; margin-top: 20px" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const date1 = ref("2022-09-03");
const date2 = ref("");
</script>
