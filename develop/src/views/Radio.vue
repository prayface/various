<template>
    <div class="checkbox">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>单独使用可以表示两种状态之间的切换。</p>
                <p>配合<span>UiRadioGroup</span>使用, 则表示在一组备选项中进行单选。</p>
            </div>
            <div class="content">
                <UiRadioGroup v-model="value1">
                    <UiRadio value="未使用插槽" />
                    <UiRadio value="使用插槽">呀! 我是在插槽插入的</UiRadio>
                </UiRadioGroup>
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
                    <td>mode</td>
                    <td>轮播图的模式</td>
                    <td>string</td>
                    <td>default | multiple-view</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>arrow</td>
                    <td>切换箭头显示时期</td>
                    <td>string</td>
                    <td>always | hover | never</td>
                    <td>hover</td>
                </tr>
                <tr>
                    <td>delay</td>
                    <td>自动切换的间隔</td>
                    <td>number</td>
                    <td>--</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>transitionDelay</td>
                    <td>过渡的间隔</td>
                    <td>number</td>
                    <td>--</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>轮播图的宽度</td>
                    <td>number | string</td>
                    <td>--</td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>轮播图的高度</td>
                    <td>number | string</td>
                    <td>--</td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>direction</td>
                    <td>展示的方向(暂未实现)</td>
                    <td>string</td>
                    <td>horizontal | vertical</td>
                    <td>horizontal</td>
                </tr>
                <tr>
                    <td>loop</td>
                    <td>是否开启无限循环</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
                </tr>
                <tr>
                    <td>autoplay</td>
                    <td>是否开启自动切换</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
                </tr>
                <tr>
                    <td>pagination</td>
                    <td>是否开启底部分页器</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
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
                    <td>cutCarousel</td>
                    <td>当前轮播切换到指定位置</td>
                    <td>(number?: number) => void</td>
                </tr>
                <tr>
                    <td>triggerNext</td>
                    <td>切换到下一屏轮播</td>
                    <td>() => void</td>
                </tr>
                <tr>
                    <td>triggerBack</td>
                    <td>切换到上一屏轮播</td>
                    <td>() => void</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(false);
const value2 = ref(false);
</script>

<style lang="less" scoped>
.checkbox {
    .ui-radio {
        margin: 0 20px 0 0;
    }
}
</style>
