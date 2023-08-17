<template>
    <div v-on="mainHandles" class="ui-tooltip-container" ref="main">
        <slot name="default"></slot>
    </div>

    <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
        <div v-if="visible" v-on="contentHandles" class="ui-tooltip" ref="tooltip" :style="style" :class="classExtraName">
            <div class="ui-tooltip-content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiTooltipFollowPropsOption } from "./index";
import { useComposable } from "./src/composable";

//* 获取组件属性
const define = defineProps(UiTooltipFollowPropsOption);

const { refs, methods, computeds, methodsOn } = useComposable(define);
const { main, tooltip, visible } = refs;
const { show, hidden, entranceAnimation, departureAnimation, entrancePreAnimation } = methods;
const { mainHandles, contentHandles } = methodsOn;
const { style } = computeds;

//* 组件配置
defineOptions({ name: "UiTooltipFollow" });
//* 导出函数
defineExpose({ show: show, hidden: hidden });
</script>
