<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>最基础的表单包括各种输入表单项, 比如<span>input</span>、<span>select</span>、<span>radio</span>、<span>checkbox</span>等。</p>
                <p>在每一个<span>form</span>组件中, 你需要一个<span>form-item</span>组件作为输入项的容器, 用于获取值与验证值。</p>
            </div>
            <div class="content">
                <UiForm :rules="rules" :data="data">
                    <UiFormItem prop="name" ref="item" label="名称">
                        <UiInput v-model="data.name" name="name" />
                    </UiFormItem>

                    <UiFormItem prop="age" direction="column" label="年龄">
                        <UiInput v-model="data.age" name="age" />
                    </UiFormItem>
                </UiForm>

                <UiButton @click="click">触发校验</UiButton>
                <UiButton @click="item && item.hidden()">隐藏校验</UiButton>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UiFormItem } from "@various";

const item = ref();
const rules = ref({
    name: [
        {
            trigger: "change",
            verify: async (data) => {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({ verify: data.name.length > 5, message: "校验不通过, 奈我何!!!" });
                    }, 1000);
                });
            },
        },
    ],
    age: [
        {
            trigger: "change",
            verify: (data) => {
                return { verify: Number(data.age) >= 18, message: "年龄不达标" };
            },
        },
        {
            trigger: "change",
            verify: (data) => {
                return { verify: Number(data.age) >= 19, message: "年龄刚好达标", type: "warning" };
            },
        },
    ],
});
const data = reactive({ age: "", name: "" });

const click = () => {
    const type = ["info", "success", "error", "warning"];
    const number = Math.ceil(Math.random() * 4);
    if (item.value) {
        item.value.trigger("策划校验文案", type[number - 1]);
    }
};
</script>

<style lang="less">
.form {
    .ui-form {
        .ui-form-item {
            margin: 0 0 40px;
        }
    }
}
</style>
