<template>
    <div class="tooltip">
        <section class="tooltip-1">
            <div class="title">基础用法</div>
            <div class="descript">
                <p>在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。</p>
                <p><span>direction</span>用来控制窗口的方向, <span>align</span>用来控制窗口的对齐方式</p>
            </div>
            <div class="content">
                <section class="tooltip-top">
                    <UiTooltip direction="top">
                        <UiButton size="small">上左按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="top" align="center">
                        <UiButton size="small">上中按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="top" align="bottom">
                        <UiButton size="small">上右按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                </section>

                <section class="tooltip-left">
                    <UiTooltip direction="left">
                        <UiButton size="small">左上按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="left" align="center">
                        <UiButton size="small">左中按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="left" align="bottom">
                        <UiButton size="small">左下按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                </section>

                <section class="tooltip-right">
                    <UiTooltip direction="right">
                        <UiButton size="small">右上按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="right" align="center">
                        <UiButton size="small">右中按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="right" align="bottom">
                        <UiButton size="small">右下按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                </section>

                <section class="tooltip-bottom">
                    <UiTooltip direction="bottom">
                        <UiButton size="small">下左按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="bottom" align="center">
                        <UiButton size="small">下中按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                    <UiTooltip direction="bottom" align="bottom">
                        <UiButton size="small">下右按钮</UiButton>
                        <template #content>悬浮信息</template>
                    </UiTooltip>
                </section>
            </div>
        </section>

        <section class="tooltip-2">
            <div class="title">禁用和隐藏</div>
            <div class="descript">
                <p>在这里可以通过<span>disabled</span>和<span>visible</span>来控制按钮的禁用和隐藏</p>
                <p>若需支持响应式需通过<span>v-model:visible</span>进行控制</p>
            </div>
            <div class="content">
                <UiTooltip direction="top" :disabled="true">
                    <UiButton size="small">该悬浮窗口已被禁用</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
                <UiTooltip direction="left" v-model:visible="visible">
                    <UiButton size="small" @click="click">点击我隐藏</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
            </div>
        </section>

        <section class="tooltip-3">
            <div class="title">Trigger: click</div>
            <div class="descript">
                <p>注: 该模式只在<span>mode=fixed</span>时生效</p>
                <p>点击时触发的窗口, 通过二次点击进行隐藏窗口</p>
            </div>
            <div class="content">
                <UiTooltip direction="top" trigger="click">
                    <UiButton size="small">点击我将从上方出现悬浮信息</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
                <UiTooltip direction="left" trigger="click">
                    <UiButton size="small">点击我将从左侧出现悬浮信息</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
                <UiTooltip direction="bottom" trigger="click">
                    <UiButton size="small">点击我将从底部出现悬浮信息</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
                <UiTooltip direction="right" trigger="click">
                    <UiButton size="small">点击我将从右侧出现悬浮信息</UiButton>
                    <template #content>悬浮信息</template>
                </UiTooltip>
            </div>
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
    .tooltip-1 {
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

    .tooltip-2,
    .tooltip-3 {
        .ui-tooltip {
            margin: 0 8px;
        }
    }
}
</style>
