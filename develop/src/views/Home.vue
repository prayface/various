<template>
    <div>
        <UiDatePicker v-model="date1" style="width: 240px" />
        <UiForm :data="data" :rules="rules">
            <UiFormItem prop="date">
                <UiDatePicker v-model="data.date" mode="month" name="date" style="width: 240px; margin-top: 20px" />
            </UiFormItem>
        </UiForm>

        <UiDatePicker
            v-model="date2"
            mode="month"
            placeholder="开始时间"
            :disabledDateStart="new Date(date3)"
            style="width: 240px; margin-top: 20px" />
        <UiDatePicker v-model="date3" mode="month" placeholder="截止时间" style="width: 240px; margin-top: 20px" @change="change()" />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const date1 = ref("");
const date2 = ref("");
const date3 = ref("");
const disabledDate1 = ref({
    start: new Date(),
    end: new Date("2025/08"),
});

const change = () => {
    console.log("change");
    if (date2.value > date3.value) {
        date2.value = "";
        console.log("date2", date2.value);
    }
};

const data = reactive({
    date: "",
});

const rules = {
    date: [
        {
            trigger: "change",
            verify: (data) => {
                const date = new Date();
                const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
                console.log(data.date, currentDate, data.date >= currentDate);
                return { verify: false, message: "校验不通过, 奈我何!!!" };
            },
        },
    ],
};
</script>
