<template>
    <div class="scope-input">
        <section>
            <div class="title">基础用法</div>
            <div class="descript">
                <p>使用<span>size</span>来定义输入框的样式。</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiScopeInput v-model="data" style="margin-bottom:20px" size="large" ref="scope" />
                <UiScopeInput v-model="data2" style="margin-bottom:20px" size="middle" />
                <UiScopeInput v-model="data2" style="margin-bottom:20px" />
                <UiScopeInput v-model="data2" size="small" />
                <UiButton @click="scope.clear()">清空</UiButton>
            </div>
        </section>
        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>通过<span>disabled</span>属性来指定是否禁用<span>input</span>组件</p>
            </div>
            <div class="content">
                <UiScopeInput v-model="data" :disabled="true" />
            </div>
        </section>

        <section>
            <div class="title">只读状态</div>
            <div class="descript">
                <p>通过<span>readonly</span>属性来指定<span>input</span>组件是否只读</p>
            </div>
            <div class="content">
                <UiScopeInput v-model="data" :readonly="true" />
            </div>
        </section>

        <section>
            <div class="title">加载状态</div>
            <div class="descript">
                <p>通过<span>loading</span>属性来指定<span>input</span>组件是否加载</p>
            </div>
            <div class="content">
                <UiScopeInput v-model="data" :loading="true" />
            </div>
        </section>


        <section>
            <div class="title">校验类型</div>
            <div class="descript">
                <p>表单的<span>form-item</span>组件允许通过修改<span>UiFormRulesVerify.type</span>来对校验提示的类型进行调整</p>
                <p>现支持配置项有: info | warning | success | error</p>
                <p>
                    <span class="warn">注</span>当<span>UiFormRulesVerify.type</span>配置为<span>info</span>,
                    <span>success</span>,
                    <span>warning</span>时, 表单的<span>validator</span>不对对其进行校验
                </p>
            </div>
            <div class="content">
                <UiForm :rules="rules1" :data="data1" ref="form">
                    <UiFormItem prop="age" label="年龄" :width="40" ref="item">
                        <UiScopeInput name="age" v-model="data1" />
                    </UiFormItem>

                    <UiFormItem style="margin-top: 40px">
                        <UiButton @click="form && form.validator()">触发校验</UiButton>
                        <UiButton @click="form && form.reset()" style="margin-left: 20px">重置表单</UiButton>
                    </UiFormItem>
                </UiForm>
            </div>
        </section>

        <section>
            <div class="title">属性</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
                <tr>
                    <td>width</td>
                    <td>输入框整体宽度</td>
                    <td>number</td>
                    <td>--</td>
                    <td>264px</td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>输入框整体的尺寸</td>
                    <td>UiTypes.size</td>
                    <td>large | middle | default | small</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>是否为禁用输入框</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>是否为只读输入框</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>是否为加载输入框</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>提示文本</td>
                    <td>string</td>
                    <td>--</td>
                    <td>Start | End</td>
                </tr>

            </table>
        </section>

        <section>
            <div class="title">事件</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
                <tr>
                    <td>change</td>
                    <td>change事件回调</td>
                    <td>(event?: Event) => void</td>
                </tr>
                <tr>
                    <td>clear</td>
                    <td>清空事件回调</td>
                    <td>(event?: any) => void</td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>input事件回调</td>
                    <td>(event?: InputEvent | Event) => void</td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>focus事件回调</td>
                    <td>(event?: FocusEvent | Event) => void</td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>blur事件回调</td>
                    <td>(event?: FocusEvent | Event) => void</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">方法</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
                <tr>
                    <td>clear</td>
                    <td>清空输入框内容</td>
                    <td>() => void</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref({ start: 1, end: 100 });
const data2 = ref({ start: "", end: "" });

const form = ref(null);
const item = ref(null);
const scope = ref(null);
const data1 = ref({ start: 0, end: 20 });
const rules1 = ref({
    age: [
        {
            trigger: "change",
            verify: (data) => {
                console.log(data);
                return { verify: Number(data.start) >= 1, message: "请输入1岁及以上" };
            },
        },
    ],
});



</script>

<style lang="less">
.ui-form {
    .ui-form-item {
        margin: 0 0 32px;

        .ui-button {
            margin: 0 0 0 48px;
        }
    }
}
</style>