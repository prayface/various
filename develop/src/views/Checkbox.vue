<template>
    <div class="checkbox">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>单独使用可以表示两种状态之间的切换。</p>
                <p>配合<span>UiCheckboxGroup</span>使用, 则表示在一组备选项中进行多选。</p>
            </div>
            <div class="content">
                <UiCheckbox v-model="value1" value="未使用插槽" />
                <UiCheckbox v-model="value2" value="使用插槽">呀! 我是在插槽插入的</UiCheckbox>
            </div>
        </section>

        <section>
            <div class="title">禁用状态</div>
            <div class="descript">
                <p>配合<span>disabled</span>使<span>UiCheckbox</span>组件处于禁用状态</p>
            </div>
            <div class="content">
                <UiCheckbox v-model="value1" value="禁用状态" disabled />
            </div>
        </section>

        <section>
            <div class="title">多选组框</div>
            <div class="descript">
                <p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
            </div>
            <div class="content">
                <p>{{ data2 }}</p>
                <UiCheckboxGroup v-model="data2" @change="change">
                    <UiCheckbox value="多选组框1" />
                    <UiCheckbox value="多选组框2" />
                    <UiCheckbox value="多选组框3" />
                    <UiCheckbox value="多选组框4" />
                    <UiCheckbox value="多选组框5" />
                </UiCheckboxGroup>
            </div>
        </section>

        <section>
            <div class="title">可选最大与最小数量</div>
            <div class="descript">
                <p>通过<span>UiCheckboxGroup</span>的<span>min</span>, <span>max</span>属性可配置, 多选框组可选的最大最小数量</p>
            </div>
            <div class="content">
                <p>{{ data3 }}</p>
                <UiCheckboxGroup v-model="data3" :min="1" :max="3">
                    <UiCheckbox value="1">多选组框1</UiCheckbox>
                    <UiCheckbox value="2">多选组框2</UiCheckbox>
                    <UiCheckbox value="3">多选组框3</UiCheckbox>
                    <UiCheckbox value="4">多选组框4</UiCheckbox>
                    <UiCheckbox value="5">多选组框5</UiCheckbox>
                </UiCheckboxGroup>
            </div>
        </section>

        <section>
            <div class="title">表单校验</div>
            <div class="descript">
                <p>表单校验需将<span>UiCheckbox</span>放置入<span>UiCheckboxGroup</span>多选框组中, 通过校验多选框组生效</p>
                <p></p>
            </div>
            <div class="content">
                <UiForm :data="data1" :rules="rules1" ref="form">
                    <UiFormItem prop="age">
                        <UiCheckboxGroup v-model="data1.age" name="age" :max="2">
                            <UiCheckbox value="钢琴家" />
                            <UiCheckbox value="小提琴家" />
                            <UiCheckbox value="种花家" />
                            <UiCheckbox value="科学家" />
                        </UiCheckboxGroup>
                    </UiFormItem>

                    <UiFormItem style="margin-top: 40px">
                        <UiButton @click="form && form.validator()">触发校验</UiButton>
                        <UiButton @click="form && form.reset()" style="margin-left: 20px">重置表单</UiButton>
                    </UiFormItem>
                </UiForm>
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

const data2 = ref([]);
const data3 = ref(["3", "4", "5"]);

const form = ref();
const data1 = ref({ age: [] });
const rules1 = ref({
    age: [
        {
            trigger: "change",
            verify: (data) => {
                return { verify: data.age.length, message: "请至少选中一个职业" };
            },
        },
    ],
});

const change = () => {};
</script>

<style lang="less" scoped>
.checkbox {
    .ui-checkbox {
        margin: 0 20px 0 0;
    }
}
</style>
