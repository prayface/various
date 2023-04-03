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
                <UiInput v-model="value" :candidate="candidate" class-extra-name="cesname" />
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
                    <td>class-extra-name</td>
                    <td>用于指定候选项的className</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
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
                    <td>candidate</td>
                    <td>候选项</td>
                    <td>(...arg: any[]) => UiTypes.candidate[] | UiTypes.candidate[]</td>
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
                    <td>click</td>
                    <td>click事件回调</td>
                    <td>(event?: PointerEvent | Event) => void</td>
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
