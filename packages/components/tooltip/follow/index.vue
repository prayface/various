<template>
    <div class="ui-tooltip-container" :class="{ 'ui-active': active }" v-on="ons.container">
        <slot name="default"></slot>

        <Transition v-on="ons.animation">
            <div v-if="visible" v-on="ons.content" class="ui-tooltip" ref="tooltip" :style="style" :class="classExtraName">
                <div class="ui-tooltip-content">
                    <slot name="content">{{ content }}</slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
//* 按需引入的插件
import { onBeforeUnmount } from "vue";
//* 组件库工具函数
import { node } from "@various/utils";
//* 资源引入
import { UiTooltipFollowPropsOption, UiTooltipFollowEmits } from "./index";
import { useComposable } from "./src/composable";

//* 获取组件属性
const emits = defineEmits(UiTooltipFollowEmits);
const define = defineProps(UiTooltipFollowPropsOption);

const { ons, refs, nodes, methods, computeds } = useComposable(define, emits);
const { active, visible } = refs;
const { tooltip } = nodes;
const { show, hidden } = methods;
const { style } = computeds;

//* 组件卸载时, 若存在残留的悬浮窗口则进行移除
onBeforeUnmount(() => {
    tooltip.value && node.remove(document.body, tooltip.value);
});

//* 组件配置
defineOptions({ name: "UiTooltipFollow" });
//* 导出函数
defineExpose({ show: show, hidden: hidden });
</script>
