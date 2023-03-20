<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>最基础的表单包括各种输入表单项, 比如<span>input</span>、<span>select</span>、<span>radio</span>、<span>checkbox</span>等。</p>
                <p>在每一个<span>form</span>组件中, 你需要一个<span>form-item</span>组件作为输入项的容器, 用于获取值与验证值。</p>
            </div>
            <div class="content">
                <UiForm :rules="rules" :data="data" ref="form">
                    <UiFormItem prop="name" label="名称" :width="40">
                        <UiInput v-model="data.name" name="name" :loading="loading1" />
                    </UiFormItem>

                    <UiFormItem prop="age" label="年龄" :width="40">
                        <UiInput v-model="data.age" name="age" />
                    </UiFormItem>

                    <UiFormItem>
                        <UiButton @click="click" :loading="loading2">触发校验</UiButton>
                        <UiButton native-type="reset" @click="form && form.reset()">重置表单</UiButton>
                    </UiFormItem>
                </UiForm>
            </div>
        </section>

        <section>
            <div class="title">校验类型</div>
            <div class="descript">
                <p>表单的<span>form-item</span>组件允许通过修改<span>UiFormRulesVerify.type</span>来对校验提示的类型进行调整</p>
                <p>现支持配置项有: info | warning | success | error</p>
                <p>
                    <span class="warn">注</span>当<span>UiFormRulesVerify.type</span>配置为<span>info</span>, <span>success</span>, <span>warning</span>时, 表单的<span>validator</span>不对对其进行校验
                </p>
            </div>
            <div class="content">
                <UiForm :rules="{}" :data="data">
                    <UiFormItem label="名称" :width="40" ref="item">
                        <UiInput v-model="data.name" :loading="loading1" />
                    </UiFormItem>

                    <UiFormItem>
                        <UiButton @click="item && item.trigger('info提示')" :loading="loading2">触发info</UiButton>
                        <UiButton @click="item && item.trigger('success提示', 'success')" type="success" :loading="loading2">触发success</UiButton>
                        <UiButton @click="item && item.trigger('warning提示', 'warning')" type="warning" :loading="loading2">触发warning</UiButton>
                        <UiButton @click="item && item.trigger('error提示', 'error')" type="error" :loading="loading2">触发error</UiButton>
                    </UiFormItem>
                </UiForm>
            </div>
        </section>

        <section>
            <div class="title">对齐方式</div>
            <div class="descript">
                <p>可通过配置<span>form-item</span>组件的<span>direction</span>来对<span>label</span>的对齐方式进行修改</p>
                <p>现支持配置项有: row | column</p>
            </div>
            <div class="content">
                <UiForm :rules="{}" :data="data">
                    <UiFormItem label="名称" :width="40" direction="row">
                        <UiInput v-model="data.name" :loading="loading1" />
                    </UiFormItem>

                    <UiFormItem label="名称" :width="40" direction="column">
                        <UiInput v-model="data.name" :loading="loading1" />
                    </UiFormItem>
                </UiForm>
            </div>
        </section>

        <section>
            <div class="title">Form属性</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
                <tr>
                    <td>size</td>
                    <td>表单内组件的尺寸, 但未实现~~</td>
                    <td>string</td>
                    <td>large | middle | default | small</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>data</td>
                    <td>表单的数据, UiFormRule的verify回调接收data</td>
                    <td>{ [name: string]: any }</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>rules</td>
                    <td>表单的校验规则</td>
                    <td>{ [name: string]: UiFormRule[] }</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">FormItem属性</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
                <tr>
                    <td>prop</td>
                    <td>触发的校验规则</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>label</td>
                    <td>label文本</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>label的宽度, 默认为auto</td>
                    <td>number</td>
                    <td>--</td>
                    <td>auto</td>
                </tr>
                <tr>
                    <td>direction</td>
                    <td>label的对齐方式</td>
                    <td>string</td>
                    <td>row | column</td>
                    <td>row</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const form = ref(null);
const item = ref(null);
const data = reactive({ age: "", name: "" });
const loading1 = ref(false);
const loading2 = ref(false);
const rules = ref({
    name: [
        {
            trigger: "change",
            verify: async (data) => {
                loading1.value = true;
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        loading1.value = false;
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
    ],
});

const click = () => {
    if (!form.value) return;
    loading2.value = true;
    form.value.validator((valid) => {
        loading2.value = false;
        console.log(`校验结果: ${valid}`);
    });
};
</script>

<style lang="less">
.form {
    .ui-form {
        .ui-form-item {
            margin: 0 0 32px;
            .ui-button {
                margin: 0 0 0 48px;
            }
        }
    }
}
</style>
