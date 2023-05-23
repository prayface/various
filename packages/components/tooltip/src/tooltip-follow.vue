<template>
    <div v-bind="$attrs" v-on="mainHandles" class="ui-tooltip-container" ref="main">
        <slot name="default"></slot>
    </div>

    <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
        <div v-if="visible" v-on="tooltipHandles" class="ui-tooltip" ref="tooltip" :style="style" :class="classExtraName">
            <div class="ui-tooltip-content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { UiTooltipFollowPropsOption } from "./tooltip";
import Composable, { UiTooltipConstructorRefs } from "./composable.follow";

export default defineComponent({
    name: "UiTooltipFollow",
    props: UiTooltipFollowPropsOption,
    setup(define, { expose }) {
        //* 初始化响应式变量
        const refs = reactive<UiTooltipConstructorRefs>({
            main: undefined, // 主体
            tooltip: undefined, // 内容
            visible: false, // 控制内容是否显示的变量
        });

        //* 实例化组合类
        const composable = new Composable(refs, define);

        // 公共方法导出
        expose({ show: composable.methods.show, hidden: composable.methods.hidden });

        return {
            ...toRefs(refs),
            ...composable.methods,
            ...composable.handles,
            ...composable.computeds,
        };
    },
});
</script>
