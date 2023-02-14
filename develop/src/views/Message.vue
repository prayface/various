<template>
    <div class="message">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiButton @click="$message({ message: '测试文本' })">测试按钮</UiButton>
            </div>
        </section>

        <section>
            <div class="title">不同状态</div>
            <div class="descript">用来显示「成功、警告、消息、错误」类的操作反馈。</div>
            <div class="content">
                <UiButton @click="$message.success('success')">success</UiButton>
                <UiButton @click="$message.warning('warning')">warning</UiButton>
                <UiButton @click="$message.error('error')">error</UiButton>
                <UiButton @click="$message.info('info')">info</UiButton>
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
                    <td>message</td>
                    <td>消息文字</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>消息类型</td>
                    <td>string</td>
                    <td>success | warning | info | error</td>
                    <td>info</td>
                </tr>
                <tr>
                    <td>icon</td>
                    <td>自定义图标，该属性会覆盖 type 的图标。</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>delay</td>
                    <td>延迟关闭的时间, 单位为毫秒。</td>
                    <td>number</td>
                    <td>--</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>offset</td>
                    <td>Message 距离窗口顶部的偏移量</td>
                    <td>number</td>
                    <td>--</td>
                    <td>20</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { $message } from "@various";

console.log($message);
</script>

<style lang="less">
.message {
    .ui-button {
        margin: 0 8px;
    }
}
</style>
