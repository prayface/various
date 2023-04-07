<template>
    <div class="textarea">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiTextarea v-model="value" :height="200" />
            </div>
        </section>
        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>通过<span>disabled</span>属性来指定是否禁用<span>input</span>组件</p>
            </div>
            <div class="content">
                <UiTextarea v-model="value" :height="200" disabled />
            </div>
        </section>

        <section>
            <div class="title">只读状态</div>
            <div class="descript">
                <p>通过<span>readonly</span>属性来指定<span>input</span>组件是否只读</p>
            </div>
            <div class="content">
                <UiTextarea v-model="value" :height="200" readonly />
            </div>
        </section>

        <section>
            <div class="title">加载状态(暂未开发)</div>
            <div class="descript">
                <p>通过<span>loading</span>属性来指定<span>input</span>组件是否加载</p>
            </div>
            <div class="content">
                <UiTextarea v-model="value" :height="200" :loading="true" />
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
                <tr>
                    <td>rows</td>
                    <td>原生输入框rows属性</td>
                    <td>number</td>
                    <td>--</td>
                    <td>3</td>
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
                    <td>enter</td>
                    <td>keydown enter事件回调</td>
                    <td>(event?: KeyboardEvent | Event) => void</td>
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

<script lang="ts" setup>
import { ref } from "vue";
const loading1 = ref(false);
const value = ref(
    "asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出asd基本用法as从顶部出现, 3秒后自动消失。基本用法as, 3秒后自动消失。基本用法as从顶部出"
);
</script>
