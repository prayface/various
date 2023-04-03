<template>
    <div class="scope-input">
        <section>
            <div class="title">基础用法</div>
            <div class="descript">
                <p>使用<span>size</span>和<span>mode</span>来定义按钮的样式。</p>
            </div>
            <div class="content">
                <ui-scope-input v-model="data" />
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
</script>
