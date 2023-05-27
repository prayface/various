<template>
    <div class="textarea">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiButton @click="$refs.modal.openModal()">开启模态框</UiButton>
                <UiModal ref="modal" title="模拟标题">
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                </UiModal>
            </div>
        </section>

        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiButton @click="$refs.modal1.openModal()">开启模态框</UiButton>
                <UiAsideModal ref="modal1">
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                    <p>测试模态框</p>
                </UiAsideModal>
            </div>
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
                    <td>open</td>
                    <td>弹出框打开回调</td>
                    <td>() => void</td>
                </tr>
                <tr>
                    <td>close</td>
                    <td>弹出框关闭回调</td>
                    <td>() => void</td>
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
                    <td>openModal</td>
                    <td>弹出框打开方法</td>
                    <td>() => void</td>
                </tr>
                <tr>
                    <td>closeModal</td>
                    <td>弹出框关闭方法</td>
                    <td>() => void</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup></script>
