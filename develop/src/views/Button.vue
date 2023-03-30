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
                    <UiButton @click="click" size="middle">大尺寸</UiButton>
                    <UiButton @click="click">默认尺寸</UiButton>
                    <UiButton @click="click" size="small">最小尺寸</UiButton>
                </p>
                <p>
                    <UiButton @click="click">info</UiButton>
                    <UiButton @click="click" type="error">error</UiButton>
                    <UiButton @click="click" type="warning">warning</UiButton>
                    <UiButton @click="click" type="success">success</UiButton>
                </p>
                <p>
                    <UiButton @click="click" simple>info</UiButton>
                    <UiButton @click="click" type="error" simple>error</UiButton>
                    <UiButton @click="click" type="warning" simple>warning</UiButton>
                    <UiButton @click="click" type="success" simple>success</UiButton>
                </p>
            </div>
        </section>
        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>你可以使用<span>disabled</span>属性来定义按钮是否被禁用。 该属性接收一个<span>Boolean</span>类型的值</p>
            </div>
            <div class="content">
                <p>
                    <UiButton @click="click" disabled>啊! 我被禁用了</UiButton>
                    <UiButton @click="click" type="error" disabled>啊! 你也被禁用了</UiButton>
                    <UiButton @click="click" type="warning" disabled>啊! 他也被禁用了</UiButton>
                    <UiButton @click="click" type="success" disabled>啊! 我们都被禁用了</UiButton>
                </p>
                <p>
                    <UiButton @click="click" disabled simple>啊! 上面的, 我们也逃不掉</UiButton>
                    <UiButton @click="click" type="error" disabled simple>啊!</UiButton>
                    <UiButton @click="click" type="warning" disabled simple>啊! 啊! </UiButton>
                    <UiButton @click="click" type="success" disabled simple>啊! 啊! 啊!</UiButton>
                </p>
            </div>
        </section>
        <section>
            <div class="title">只读状态</div>
            <div class="descript">
                <p>你可以使用<span>readonly</span>属性来定义按钮是否只读。 该属性接收一个<span>Boolean</span>类型的值</p>
            </div>
            <div class="content">
                <p>
                    <UiButton @click="click" readonly>啊! 我被禁用了</UiButton>
                    <UiButton @click="click" type="error" readonly>啊! 我被禁用了</UiButton>
                    <UiButton @click="click" type="warning" readonly>啊! 我被禁用了</UiButton>
                    <UiButton @click="click" type="success" readonly>啊! 我被禁用了</UiButton>
                </p>
                <p>
                    <UiButton @click="click" readonly simple>啊! 我也被禁用了</UiButton>
                    <UiButton @click="click" type="error" readonly simple>啊! 我也被禁用了</UiButton>
                    <UiButton @click="click" type="warning" readonly simple>啊! 我也被禁用了</UiButton>
                    <UiButton @click="click" type="success" readonly simple>啊! 我也被禁用了</UiButton>
                </p>
            </div>
        </section>
        <section>
            <div class="title">加载状态</div>
            <div class="descript">
                <p>点击按钮来加载数据，并向用户反馈加载状态。</p>
                <p>通过设置<span>loading</span>属性为<span>true</span>来显示加载中的状态</p>
            </div>
            <div class="content">
                <p>
                    <UiButton @click="click" loading>啊! 我正在加载中</UiButton>
                    <UiButton @click="click" type="error" loading>啊! 我正在加载中</UiButton>
                    <UiButton @click="click" type="warning" loading>啊! 我正在加载中</UiButton>
                    <UiButton @click="click" type="success" loading>啊! 我正在加载中</UiButton>
                </p>
                <p>
                    <UiButton @click="click" loading simple>啊! 我也正在加载中</UiButton>
                    <UiButton @click="click" type="error" loading simple>啊! 我也正在加载中</UiButton>
                    <UiButton @click="click" type="warning" loading simple>啊! 我也正在加载中</UiButton>
                    <UiButton @click="click" type="success" loading simple>啊! 我也正在加载中</UiButton>
                </p>
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
const click = () => {
    console.log("I am Button");
};
</script>

<style lang="less">
.button {
    section {
        margin-bottom: 20px;
        .content {
            p {
                display: flex;
                align-items: flex-end;
            }
        }

        .ui-button {
            margin-right: 8px;
        }
    }
}
</style>
