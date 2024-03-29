<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>input</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiStepsInput v-model="value" :placeholder="placeholder" />
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
                    <td>autocomplete</td>
                    <td>是否启动浏览器的自动填充</td>
                    <td>string</td>
                    <td>off | on</td>
                    <td>off</td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>提示文本</td>
                    <td>string</td>
                    <td>--</td>
                    <td>Please input</td>
                </tr>
                <tr>
                    <td>modelValue</td>
                    <td>v-model</td>
                    <td>string | number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>candidates</td>
                    <td>候选项</td>
                    <td>UiTypes.candidate[]</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>clearable</td>
                    <td>是否显示可清空按钮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>是否禁用</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>是否只读</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>内置Loading</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>输入框尺寸</td>
                    <td>number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>原生输入框输入类型</td>
                    <td>string</td>
                    <td>email | number | search | tel | text</td>
                    <td>text</td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>输入框尺寸</td>
                    <td>UiTypes.size</td>
                    <td>default | middle | large | small</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>原生输入框name属性</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
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
                    <td>(event: Event) => void</td>
                </tr>
                <tr>
                    <td>select</td>
                    <td>候选项选择事件回调</td>
                    <td>(event: Event) => void</td>
                </tr>
                <tr>
                    <td>clear</td>
                    <td>清空事件回调</td>
                    <td>(event?: any) => void</td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>input事件回调</td>
                    <td>(event: InputEvent | Event) => void</td>
                </tr>
                <tr>
                    <td>enter</td>
                    <td>keydown enter事件回调</td>
                    <td>(event: KeyboardEvent | Event) => void</td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>focus事件回调</td>
                    <td>(event: FocusEvent | Event) => void</td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>blur事件回调</td>
                    <td>(event: FocusEvent | Event) => void</td>
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
                <tr>
                    <td>focus</td>
                    <td>输入框获取焦点事件</td>
                    <td>() => void</td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>输入框失去焦点事件</td>
                    <td>() => void</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">插槽</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>数据</th>
                </tr>
                <tr>
                    <td>candidate</td>
                    <td>下拉候选项的插槽</td>
                    <td>data</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref({
    "start-steps": 0,
    "end-steps": 0,
    "start": "",
    "end": "",
});

const placeholder = ref({
    start: "CDS Start",
    end: "CDS End",
});
</script>
