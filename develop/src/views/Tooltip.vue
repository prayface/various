<template>
    <div class="tooltip">
        <section class="tooltip-1">
            <div class="title">基础用法</div>
            <div class="descript">
                <p>在这里我们提供<span>固定模式(fixed)</span>和<span>跟随模式(follow)</span>两种展示方式, 你可根据需求选择不同模式</p>
                <p><span class="warn">注</span>固定模式(fixed)下以下属性将失效: <span>offsetX</span>、<span>offsetY</span></p>
                <p><span class="warn">注</span>跟随模式(follow)下以下属性将失效: <span>direction</span>、<span>trigger</span>、<span>align</span></p>
            </div>
            <div class="content">
                <UiTooltip content="悬浮信息">
                    <UiButton size="small">固定模式</UiButton>
                </UiTooltip>
                <UiTooltip content="悬浮信息" mode="follow">
                    <UiButton size="small">跟随模式</UiButton>
                </UiTooltip>
            </div>
        </section>

        <section class="tooltip-2">
            <div class="title">固定模式的触发条件</div>
            <div class="descript">
                <p>固定模式拥有2中触发条件: <span>悬浮(hover)</span>、<span>点击(click)</span></p>
            </div>
            <div class="content">
                <UiTooltip direction="top" content="悬浮信息">
                    <UiButton size="small">悬浮时触发</UiButton>
                </UiTooltip>
                <UiTooltip direction="top" trigger="click" content="悬浮信息">
                    <UiButton size="small">点击时触发</UiButton>
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
                    <UiTooltip direction="top" align="bottom" content="悬浮信息">
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
                    <UiTooltip direction="left" align="bottom" content="悬浮信息">
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
                    <UiTooltip direction="right" align="bottom" content="悬浮信息">
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
                    <UiTooltip direction="bottom" align="bottom" content="悬浮信息">
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

        <section class="tooltip-5">
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
                    <td>direction</td>
                    <td>Tooltip的主轴位置, 只在mode=fixed时生效</td>
                    <td>string</td>
                    <td>top | left | right | bottom</td>
                    <td>right</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Tooltip的是否禁用, 禁用状态将无信息悬浮</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>visible</td>
                    <td>Tooltip的是否隐藏</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>offsetX</td>
                    <td>Tooltip的X轴偏移位置, 只在mode=follow时生效</td>
                    <td>number</td>
                    <td>--</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>offsetY</td>
                    <td>Tooltip的Y轴偏移位置, 只在mode=follow时生效</td>
                    <td>number</td>
                    <td>--</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>trigger</td>
                    <td>Tooltip的触发条件, 只在mode=fixed时生效</td>
                    <td>string</td>
                    <td>click | hover</td>
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
                    <td>effect</td>
                    <td>Tooltip的主题, 将在Tooltip顶层挂载ui-effect-${effect}类名, 用于自定义主题</td>
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
                <tr>
                    <td>align</td>
                    <td>Tooltip的侧轴位置, 只在mode=fixed时生效</td>
                    <td>string</td>
                    <td>top | center | bottom</td>
                    <td>top</td>
                </tr>
                <tr>
                    <td>mode</td>
                    <td>Tooltip的模式: 固定模式(fixed)、跟随模式(follow)</td>
                    <td>string</td>
                    <td>fixed | follow</td>
                    <td>fixed</td>
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
</script>

<style lang="less">
.tooltip {
    .tooltip-1,
    .tooltip-2,
    .tooltip-4 {
        .ui-tooltip {
            margin: 0 8px;
        }
    }

    .tooltip-3 {
        .tooltip-top {
            margin: 20px 120px;
            .ui-tooltip {
                margin: 0 8px;
            }
        }

        .tooltip-left {
            display: inline-flex;
            flex-direction: column;
            .ui-tooltip {
                margin: 8px 0;
            }
        }

        .tooltip-right {
            margin: 0 0 0 360px;
            display: inline-flex;
            flex-direction: column;
            .ui-tooltip {
                margin: 8px 0;
            }
        }

        .tooltip-bottom {
            margin: 20px 120px;
            .ui-tooltip {
                margin: 0 8px;
            }
        }
    }
}
</style>
