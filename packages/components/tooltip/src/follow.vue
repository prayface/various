<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="hanlders">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="view.visible" ref="container" :style="styles" :class="className" v-on="containerHanlders">
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

const define = defineProps(UiTooltipType);
const timer = ref<NodeJS.Timer | undefined>();

//* 视图控制器
const view = reactive({
    visible: false, //* 是否显示
    hidden: (delay: number = 200) => {
        timer.value && clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            view.visible = false;
        }, delay);
    },
    show: (ev?: MouseEvent) => {
        timer.value && clearTimeout(timer.value);
        timer.value = undefined;
        view.visible = true;
        nextTick(() => {
            if (container.value && ev) {
                //* 将content添加到视图容器中
                node.append("ui-windows", container.value);
                //* 根据配置计算当前窗口位置
                const rect = dispost.elementToMouseBoundary(ev, dispost.elementToBodyRect(container.value), {
                    offsetX: define.offsetX || 20,
                    offsetY: define.offsetY || 20,
                });
                //* 将窗口位置添加入窗口中
                if (rect) {
                    container.value.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                    container.value.style.transform = rect.transform;
                }
            }
        });
    },
});

//* 工具函数和计算属性初始化
const { className, styles } = useComputeds(define);
const { triggerView, trigger, container, main } = useUtils(define, view);

//* ui-tooltip的处理函数
const hanlders = {
    mouseenter: (ev: MouseEvent) => trigger("follow", true, ev),
    mouseleave: (ev: MouseEvent) => trigger("follow", false, ev),
    mousemove: (ev: MouseEvent) => trigger("follow", true, ev),
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
