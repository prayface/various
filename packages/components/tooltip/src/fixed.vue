<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="hanlders">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="view.visible" ref="container" :style="styles" :class="className" v-on="containerHanlders">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import useUtils from "./useUtils";
import useComputeds from "./useComputeds";
import { node, dispost } from "@various/utils";
import { UiTooltipType } from "./tooltip";
import { nextTick, onBeforeUnmount, watch, ref, reactive, toRefs } from "vue";

//* 初始化Props
const define = defineProps(UiTooltipType);
//* 定时器初始化
const timer = ref<NodeJS.Timer | undefined>();

//* 视图控制器
const view = reactive({
    visible: false, //* 是否显示
    //* 隐藏
    hidden: (delay: number = 200) => {
        timer.value && clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            view.visible = false;
        }, delay);
    },
    //* 显示
    show: () => {
        timer.value && clearTimeout(timer.value);
        timer.value = undefined;
        view.visible = true;
        nextTick(() => {
            if (main.value && container.value) {
                //* 将content添加到视图容器中
                node.append("ui-windows", container.value);
                //* 根据配置计算当前窗口位置
                const rect = dispost.elementToContainerBoundary(dispost.elementToBodyRect(main.value), dispost.elementToBodyRect(container.value), {
                    direction: define.direction,
                    align: define.align,
                });
                //* 将窗口位置添加入窗口中
                if (rect) {
                    container.value.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                    container.value.style.transform = rect.transform;
                    if (rect.triangle && triangle.value) {
                        triangle.value.style.inset = rect.triangle;
                        triangle.value.style.transform = `rotate(${rect.rotate})`;
                    }
                }
            }
        });
    },
});

//* 工具函数和计算属性初始化
const { className, styles } = useComputeds(define);
const { trigger, triggerView, container, triangle, main } = useUtils(define, view);

//* ui-tooltip的处理函数
const hanlders = {
    click: () => trigger("click", true),
    mouseenter: () => trigger("hover", true),
    mouseleave: () => trigger("hover", false),
};

//* ui-tooltip-container的处理函数
const containerHanlders = {
    mouseenter: () => triggerView(true, timer.value),
    mouseleave: () => triggerView(false, timer.value),
};

//* 侦听器, 用于侦听visible属性, 对窗口进行隐藏
const stop = watch(
    () => define.visible,
    () => {
        define.visible && container.value && view.hidden(0);
    }
);

//* 将视图控制器暴露出去
defineExpose({ ...toRefs(view) });
//* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
onBeforeUnmount(() => {
    stop && stop();
    timer.value && clearTimeout(timer.value);
    container.value && node.remove("ui-windows", container.value);
});
</script>
