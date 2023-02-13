<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>最基础的表单包括各种输入表单项, 比如<span>input</span>、<span>select</span>、<span>radio</span>、<span>checkbox</span>等。</p>
                <p>在每一个<span>form</span>组件中, 你需要一个<span>form-item</span>组件作为输入项的容器, 用于获取值与验证值。</p>
            </div>
            <div class="content">
                <UiForm :rules="rules1">
                    <UiFormItem prop="name"></UiFormItem>
                </UiForm>

                <UiForm :rules="rules2">
                    <UiFormItem prop="name"></UiFormItem>
                </UiForm>
            </div>
        </section>
    </div>
</template>

<script setup>
const rules1 = {
    name: [{ message: "测试文本1" }],
};

const rules2 = {
    name: [{ message: "测试文本2" }],
};
</script>
