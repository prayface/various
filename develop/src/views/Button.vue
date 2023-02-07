<template>
    <div class="button">
        <section>
            <div class="title">基础用法</div>
            <div class="descript">
                <p>使用<span>size</span>和<span>mode</span>来定义按钮的样式。</p>
            </div>
            <div class="content">
                <p>
                    <UiButton @click="click" size="large">最大尺寸</UiButton>
                    <UiButton @click="click" size="large" mode="pierced">最大尺寸</UiButton>
                </p>
                <p>
                    <UiButton @click="click" size="middle">大尺寸</UiButton>
                    <UiButton @click="click" size="middle" mode="pierced">大尺寸</UiButton>
                </p>
                <p>
                    <UiButton @click="click">默认尺寸</UiButton>
                    <UiButton @click="click" mode="pierced">默认尺寸</UiButton>
                </p>
                <p>
                    <UiButton @click="click" size="small">最小尺寸</UiButton>
                    <UiButton @click="click" size="small" mode="pierced">最小尺寸</UiButton>
                </p>
            </div>
        </section>
        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>你可以使用<span>disabled</span>属性来定义按钮是否被禁用。 该属性接收一个<span>Boolean</span>类型的值</p>
            </div>
            <div class="content">
                <UiButton @click="click" :disabled="true">啊! 我被禁用了</UiButton>
                <UiButton @click="click" mode="pierced" :disabled="true">啊! 我也被禁用了</UiButton>
            </div>
        </section>
        <section>
            <div class="title">加载状态</div>
            <div class="descript">
                <p>点击按钮来加载数据，并向用户反馈加载状态。</p>
                <p>通过设置<span>loading</span>属性为<span>true</span>来显示加载中的状态</p>
            </div>
            <div class="content">
                <UiButton @click="click" :loading="true">啊! 我正在加载中</UiButton>
                <UiButton @click="click" mode="pierced" :loading="true">啊! 我也正在加载中</UiButton>
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
                    <td>disabled</td>
                    <td>是否为禁用按钮</td>
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
                    <td>size</td>
                    <td>按钮的尺寸</td>
                    <td>string</td>
                    <td>large | middle | default | small</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>原生按钮的Type属性</td>
                    <td>string</td>
                    <td>button | submit | reset</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td>mode</td>
                    <td>按钮的模式, 当前支持镂空按钮(pierced)和实体按钮(entity)</td>
                    <td>string</td>
                    <td>pierced | entity</td>
                    <td>entity</td>
                </tr>
                <tr>
                    <td>icon</td>
                    <td>按钮左侧的小图标</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
const click = () => {
    console.log("I am Button");
};
</script>

<style lang="less">
.button {
    section {
        margin-bottom: 20px;
        .ui-button {
            margin-right: 8px;
        }
    }
}
</style>
