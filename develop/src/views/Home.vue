<template>
    <div>
        <UiDatePicker v-model="date1" style="width: 240px" />
        <UiForm :data="data" :rules="rules">
            <UiFormItem prop="date">
                <UiDatePicker v-model="data.date" mode="month" name="date" style="width: 240px; margin-top: 20px" />
            </UiFormItem>
        </UiForm>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const date1 = ref("");
const data = reactive({
    date: "",
});

const rules = {
    date: [
        {
            trigger: "change",
            verify: (data) => {
                return { verify: false, message: "校验不通过, 奈我何!!!" };
            },
        },
    ],
};
</script>
