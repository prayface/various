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
                    <UiFormItem prop="name" ref="item">
                        <UiInput v-model="data.name" />
                    </UiFormItem>

                    <UiFormItem prop="name" direction="column">
                        <UiInput v-model="data.age" />
                    </UiFormItem>
                </UiForm>

                <UiButton @click="item && item.show()">触发校验</UiButton>
                <UiButton @click="item && item.hidden()">隐藏校验</UiButton>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UiFormItem } from "@various";

const item = ref();
const rules = ref({});
const data = reactive({ age: 18, name: "" });
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
