<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" @click="trigger('click', true)" @mouseenter="trigger('hover', true)" @mouseleave="trigger('hover', false)">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="show" ref="container" :style="styles" :class="className" @mouseenter="triggerView(true)" @mouseleave="triggerView(false)">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { node, dispost } from "../../../utils";
import { TooltipType } from "./tooltip";
import { computed, nextTick, onBeforeUnmount, watch, ref } from "vue";

const main = ref<HTMLElement | undefined>();
const triangle = ref<HTMLElement | undefined>();
const container = ref<HTMLElement | undefined>();
const define = defineProps(TooltipType);
const timer = ref<NodeJS.Timer | null>();
const show = ref<boolean>(false);

const className = computed(() => {
    return define.effect ? `ui-effect-${define.effect}` : "";
});
const styles = computed(() => {
    return {
        "max-width": define.width + "px",
    };
});

//* 触发函数
const trigger = (trigger: string, show: boolean) => {
    if (define.trigger != trigger || define.disabled) return;
    else {
        switch (define.trigger) {
            case "click": {
                return container.value ? view.hidden(0) : view.show();
            }

            default: {
                return show ? view.show() : view.hidden();
            }
        }
    }
};
//* 鼠标移入窗口中的触发函数
const triggerView = (show: boolean) => {
    if (define.trigger == "hover") {
        timer.value && clearTimeout(timer.value);
        if (!show) {
            view.hidden();
        }
    }
};

//* 视图控制器
const view = {
    //* 显示窗口
    show: () => {
        show.value = true;
        timer.value && clearTimeout(timer.value);
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
    //* 隐藏窗口
    hidden: (delay: number = 200) => {
        timer.value && clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            show.value = false;
            //* 隐藏窗口前将窗口调回原位置
            if (container.value && main.value) {
                node.append(main.value, container.value);
            }
        }, delay);
    },
};

//* 侦听器, 用于侦听visible属性, 对窗口进行隐藏
const stop = watch(
    () => define.visible,
    () => {
        define.visible && container.value && view.hidden(0);
    }
);

//* 将视图控制器暴露出去
defineExpose({ view });
//* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
onBeforeUnmount(() => {
    stop && stop();
    timer.value && clearTimeout(timer.value);
    container.value && node.remove("ui-windows", container.value);
});
</script>
