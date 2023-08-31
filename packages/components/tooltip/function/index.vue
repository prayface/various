<template>
    <div class="ui-tooltip-container" ref="main">
        <slot name="default"></slot>

        <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
            <div v-if="visible" v-on="contentHandles" class="ui-tooltip" ref="tooltip" :style="style" :class="classExtraName">
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
import { UiTooltipFunctionPropsOption } from "./index";
import { useComposable } from "./src/composable";

//* 获取组件属性
const define = defineProps(UiTooltipFunctionPropsOption);

const { refs, methods, computeds, methodsOn } = useComposable(define);
const { main, tooltip, visible } = refs;
const { show, hidden, entranceAnimation, departureAnimation, entrancePreAnimation } = methods;
const { contentHandles } = methodsOn;
const { style } = computeds;

//* 组件卸载时, 若存在残留的悬浮窗口则进行移除
onBeforeUnmount(() => {
    tooltip.value && node.remove(document.body, tooltip.value);
});

//* 组件配置
defineOptions({ name: "UiTooltipFunction" });
//* 导出函数
defineExpose({ show: show, hidden: hidden });
</script>
