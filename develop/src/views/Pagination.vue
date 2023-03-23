<template>
    <div class="pagination">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">从顶部出现, 3秒后自动消失。</div>
            <div class="content">
                <UiPagination v-model="page" :count="88" :limit="5" />
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
                    <td>skip</td>
                    <td>点击...时分页切换的页码数</td>
                    <td>number</td>
                    <td>--</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>count</td>
                    <td>数据的总量</td>
                    <td>number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>items</td>
                    <td>是否显示统计信息</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>limit</td>
                    <td>每页统计的数据量</td>
                    <td>number</td>
                    <td>--</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>modelValue</td>
                    <td>当前的页码</td>
                    <td>number</td>
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
                    <td>当页码发现变化时, 触发此回调</td>
                    <td>(key?: number) => key</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const page = ref(1);
</script>
