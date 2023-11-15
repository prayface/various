<template>
    <div class="tooltip">
        <section class="tooltip-1">
            <div class="title">基础用法</div>
            <div class="descript">
                <p>在这里我们提供<span>固定模式(UiTooltip)</span>和<span>跟随模式(UiTooltipFollow)</span>两种展示方式, 你可根据需求选择不同模式</p>
                <p><span class="warn">注</span>固定模式下以下属性将失效: <span>offsetX</span>、<span>offsetY</span></p>
                <p><span class="warn">注</span>跟随模式下以下属性将失效: <span>direction</span>、<span>trigger</span>、<span>align</span></p>
            </div>
            <div class="content">
                <UiTooltip content="悬浮信息">
                    <UiButton size="small">固定模式</UiButton>
                </UiTooltip>
                <UiTooltipFollow content="悬浮信息">
                    <UiButton size="small">跟随模式</UiButton>
                </UiTooltipFollow>
            </div>
        </section>

        <section class="tooltip-2">
            <div class="title">固定模式的触发条件</div>
            <div class="descript">
                <p>固定模式拥有2中触发条件: <span>悬浮(hover)</span>、<span>无触发条件(none)</span></p>
            </div>
            <div class="content">
                <UiTooltip direction="top" content="悬浮信息">
                    <UiButton size="small">悬浮时触发</UiButton>
                </UiTooltip>
                <UiTooltip direction="top" trigger="click" content="悬浮信息">
                    <UiButton size="small">没有任何触发条件</UiButton>
                </UiTooltip>
            </div>
        </section>

        <section class="tooltip-3">
            <div class="title">固定模式的主轴侧轴对齐方向</div>
            <div class="descript">
                <p>在这里我们提供主轴和侧轴的对齐方式, 通过组合有12种不同方向的展示方式, 可以通过以下完整示例来理解, 选择你要的效果。</p>
                <p>主轴<span>direction</span>: top | left | right | bottom</p>
                <p>侧轴<span>align</span>: top | center | bottom</p>
            </div>
            <div class="content">
                <section class="tooltip-top">
                    <UiTooltip direction="top" content="悬浮信息">
                        <UiButton size="small">上左按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="top" align="center" content="悬浮信息">
                        <UiButton size="small">上中按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="top" align="end" content="悬浮信息">
                        <UiButton size="small">上右按钮</UiButton>
                    </UiTooltip>
                </section>

                <section class="tooltip-left">
                    <UiTooltip direction="left" content="悬浮信息">
                        <UiButton size="small">左上按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="left" align="center" content="悬浮信息">
                        <UiButton size="small">左中按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="left" align="end" content="悬浮信息">
                        <UiButton size="small">左下按钮</UiButton>
                    </UiTooltip>
                </section>

                <section class="tooltip-right">
                    <UiTooltip direction="right" content="悬浮信息">
                        <UiButton size="small">右上按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="right" align="center" content="悬浮信息">
                        <UiButton size="small">右中按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="right" align="end" content="悬浮信息">
                        <UiButton size="small">右下按钮</UiButton>
                    </UiTooltip>
                </section>

                <section class="tooltip-bottom">
                    <UiTooltip direction="bottom" content="悬浮信息">
                        <UiButton size="small">下左按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="bottom" align="center" content="悬浮信息">
                        <UiButton size="small">下中按钮</UiButton>
                    </UiTooltip>
                    <UiTooltip direction="bottom" align="end" content="悬浮信息">
                        <UiButton size="small">下右按钮</UiButton>
                    </UiTooltip>
                </section>
            </div>
        </section>

        <section class="tooltip-4">
            <div class="title">禁用和隐藏</div>
            <div class="descript">
                <p>禁用模式下将无悬浮信息, 隐藏模式顾名思义</p>
            </div>
            <div class="content">
                <UiTooltip direction="top" :disabled="true" content="悬浮信息">
                    <UiButton size="small">该悬浮窗口已被禁用</UiButton>
                </UiTooltip>
                <UiTooltip v-model:visible="visible" content="悬浮信息">
                    <UiButton size="small" @click="click">点击我隐藏</UiButton>
                </UiTooltip>
            </div>
        </section>

        <section class="tooltip-4">
            <div class="title">基于方法的悬浮信息窗口</div>
            <div class="descript">
                <p>基于方法的悬浮信息窗口, 顾名思义</p>
            </div>
            <div class="content">
                <UiTooltipFunction ref="container" content="悬浮信息">
                    <template #default>
                        <div style="width: 1000px; height: 240px; display: flex">
                            <div style="flex: 1; height: 100%; background-color: red" @mouseenter="show" @mouseleave="hidden"></div>
                            <div style="flex: 1; height: 100%; background-color: yellow" @mouseenter="show" @mouseleave="hidden"></div>
                            <div style="flex: 1; height: 100%; background-color: blue" @mouseenter="show" @mouseleave="hidden"></div>
                        </div>
                    </template>
                    <template #content>
                        <div style="width: 400px; height: 240px">我可是很大的</div>
                    </template>
                </UiTooltipFunction>
            </div>
        </section>

        <section>
            <div class="title">UiTooltip 属性</div>
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
                    <td>用于指定窗口的className</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>direction</td>
                    <td>Tooltip的主轴位置</td>
                    <td>string</td>
                    <td>top | left | right | bottom</td>
                    <td>right</td>
                </tr>
                <tr>
                    <td>align</td>
                    <td>Tooltip的侧轴位置</td>
                    <td>string</td>
                    <td>end | start | center</td>
                    <td>top</td>
                </tr>
                <tr>
                    <td>offset</td>
                    <td>Tooltip的主轴偏移距离</td>
                    <td>number</td>
                    <td>--</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Tooltip的是否禁用, 禁用状态将无信息悬浮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>trigger</td>
                    <td>Tooltip的触发条件</td>
                    <td>string</td>
                    <td>none | hover</td>
                    <td>hover</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>Tooltip的内容, 该内容会被slot#content覆盖</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>Tooltip的最大尺寸</td>
                    <td>number</td>
                    <td>--</td>
                    <td>200</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">UiTooltipFollow 属性</div>
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
                    <td>用于指定窗口的className</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Tooltip的是否禁用, 禁用状态将无信息悬浮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>offsetX</td>
                    <td>Tooltip的X轴偏移位置</td>
                    <td>number</td>
                    <td>--</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>offsetY</td>
                    <td>Tooltip的Y轴偏移位置</td>
                    <td>number</td>
                    <td>--</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>Tooltip的内容, 该内容会被slot#content覆盖</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>Tooltip的最大尺寸</td>
                    <td>number</td>
                    <td>--</td>
                    <td>200</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">插槽</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>数据</th>
                </tr>
                <tr>
                    <td>default</td>
                    <td>悬浮窗跟随内容的插槽</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>悬浮窗内容的插槽</td>
                    <td>--</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
const visible = ref(false);
const click = () => {
    visible.value = true;
    setTimeout(() => {
        visible.value = false;
    }, 2000);
};

const container = ref();
const show = (ev) => {
    if (!container.value) return;
    else {
        container.value.show("center", { pageX: ev.pageX, pageY: ev.pageY });
    }
};

const hidden = () => {
    if (!container.value) return;
    else {
        container.value.hidden();
    }
};
</script>

<style lang="less">
.tooltip {
    .tooltip-1,
    .tooltip-2,
    .tooltip-4 {
        .ui-tooltip-container {
            margin: 0 8px;
        }
    }

    .tooltip-3 {
        .tooltip-top {
            margin: 20px 120px;
            .ui-tooltip-container {
                margin: 0 8px;
            }
        }

        .tooltip-left {
            display: inline-flex;
            flex-direction: column;
            .ui-tooltip-container {
                margin: 8px 0;
            }
        }

        .tooltip-right {
            margin: 0 0 0 360px;
            display: inline-flex;
            flex-direction: column;
            .ui-tooltip-container {
                margin: 8px 0;
            }
        }

        .tooltip-bottom {
            margin: 20px 120px;
            .ui-tooltip-container {
                margin: 0 8px;
            }
        }
    }
}
</style>
