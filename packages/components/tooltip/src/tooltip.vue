<template>
    <div class="ui-tooltip-container" v-on="mainHandles" v-bind="$attrs" ref="main">
        <slot name="default"></slot>
    </div>

    <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
        <div v-if="visible" v-on="tooltipHandles" class="ui-tooltip" ref="tooltip" :style="style" :class="classExtraName">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <div class="ui-tooltip-content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { UiTooltipPropsOption } from "./tooltip";

import Composable from "./composable.default";

export default defineComponent({
    name: "UiTooltip",
    props: UiTooltipPropsOption,
    setup(define, { expose }) {
        // 数据初始化
        const refs = reactive({
            main: undefined, // 主体
            tooltip: undefined, // 内容
            triangle: undefined, // 小三角
            visible: false, // 控制内容是否显示的变量
        });

        // 实例化组合类
        const composable = new Composable(refs, define);

        // 公共方法导出
        expose({ show: composable.methods.show, hidden: composable.methods.hidden });

        return {
            ...toRefs(refs),
            ...composable.computeds,
            ...composable.methods,
            ...composable.handles,
        };
    },
});
</script>
