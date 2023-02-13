<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiInput v-model="value" size="large" :width="200" style="margin-right: 8px" />
                <UiInput v-model="value" size="middle" :width="200" style="margin-right: 8px" />
                <UiInput v-model="value" :width="200" style="margin-right: 8px" />
                <UiInput v-model="value" size="small" :width="200" />
            </div>
        </section>

        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>通过<span>disabled</span>属性来指定是否禁用<span>input</span>组件</p>
            </div>
            <div class="content">
                <UiInput v-model="value" :disabled="true" />
            </div>
        </section>

        <section>
            <div class="title">只读状态</div>
            <div class="descript">
                <p>通过<span>readonly</span>属性来指定<span>input</span>组件是否只读</p>
            </div>
            <div class="content">
                <UiInput v-model="value" :readonly="true" />
            </div>
        </section>

        <section>
            <div class="title">加载状态</div>
            <div class="descript">
                <p>通过<span>loading</span>属性来指定<span>input</span>组件是否加载</p>
            </div>
            <div class="content">
                <UiInput v-model="value" :loading="true" />
            </div>
        </section>

        <section>
            <div class="title">一键清空</div>
            <div class="descript">
                <p>使用<span>clearable</span>属性即可在当输入框存在内容时出现一个可一键清空的按钮</p>
            </div>
            <div class="content">
                <UiInput v-model="value" :clearable="true" />
            </div>
        </section>

        <section>
            <div class="title">候选项</div>
            <div class="descript">
                <p>可以通过<span>candidate</span>属性设置<span>input</span>的候选项, 当<span>input</span>获取焦点时出现候选列表</p>
                <p>候选项<span>candidate</span>支持<span>() => UiTypes.candidate[]</span>和<span>UiTypes.candidate[]</span>类型</p>
            </div>
            <div class="content">
                <p>1. () => UiTypes.candidate[]的候选项</p>
                <UiInput v-model="value" :candidate="candidate" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const candidate = () => {
    return [
        { label: "测试选项1", value: "test1" },
        { label: "测试选项2", value: "test2" },
        { label: "测试选项3", value: "test3" },
        { label: "测试选项4", value: "test4" },
    ];
};
</script>
