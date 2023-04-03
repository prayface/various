<template>
    <div class="scope-input">
        <section>
            <div class="title">基础用法</div>
            <div class="descript">
                <p>使用<span>size</span>和<span>mode</span>来定义按钮的样式。</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiScopeInput v-model="data" style="margin-bottom:20px" size="large" />
                <!-- <UiScopeInput v-model="data" style="margin-bottom:20px" size="middle" />
                <UiScopeInput v-model="data" style="margin-bottom:20px" />
                <UiScopeInput v-model="data" size="small" /> -->
            </div>
        </section>
        <!-- <section>
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
        </section> -->

        <!-- 
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
                <UiForm :rules="rules1" :data="data1">
                    <UiFormItem label="名称" :width="40" ref="item">
                        <UiScopeInput v-model="data1" />
                    </UiFormItem>

                    <UiFormItem style="margin-top: 40px">
                        <UiButton @click="form && form.validator()">触发校验</UiButton>
                        <UiButton @click="form && form.reset()" style="margin-left: 20px">重置表单</UiButton>
                    </UiFormItem>
                </UiForm>
            </div>
        </section> -->

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
                    <td>size</td>
                    <td>按钮的尺寸</td>
                    <td>string</td>
                    <td>large | middle | default | small</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>按钮的类型</td>
                    <td>string</td>
                    <td>success | warning | error | info</td>
                    <td>info</td>
                </tr>
                <tr>
                    <td>simple</td>
                    <td>按钮的简单模式</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>是否为禁用按钮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>是否为只读按钮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>是否为加载按钮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>按钮的最小宽度, 还会根据内容拉伸宽度</td>
                    <td>number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>nativeType</td>
                    <td>原生按钮的Type属性</td>
                    <td>string</td>
                    <td>button | submit | reset</td>
                    <td>button</td>
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
                    <td>click</td>
                    <td>点击事件回调</td>
                    <td>(event?: MouseEvent | Event) => void</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref({ start: "", end: "" });

const form = ref();
const data1 = ref({ start: 1, end: 20 });
const rules1 = ref({
    start: [
        {
            trigger: "change",
            verify: (data) => {
                return { verify: data.start, message: "请至少选中一个职业" };
            },
        },
    ],
});

</script>
