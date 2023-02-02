<template>
    <div
        v-show="!visible"
        class="ui-tooltip"
        ref="container"
        @click="trigger('click', true)"
        @mouseenter="trigger('hover', true)"
        @mouseleave="trigger('hover', false)"
    >
        <slot name="default"></slot>
    </div>

    <Transition>
        <div
            class="ui-tooltip-content"
            v-if="show"
            ref="content"
            :style="styles"
            :class="className"
            @mouseenter="triggerView(true)"
            @mouseleave="triggerView(false)"
        >
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { node, dispost } from "../../../utils";
import { TooltipType } from "./tooltip";
import { computed, nextTick, onBeforeUnmount, watch, ref } from "vue";

const container = ref<HTMLElement | undefined>();
const content = ref<HTMLElement | undefined>();
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
                return content.value ? view.hidden(0) : view.show();
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
            if (container.value && content.value) {
                //* 将content添加到视图容器中
                node.append("ui-windows", content.value);
                //* 根据配置计算当前窗口位置
                const rect = dispost.boundary(dispost.elementToBodyRect(container.value), dispost.elementToBodyRect(content.value), {
                    direction: define.direction,
                    align: define.align,
                });
                //* 将窗口位置添加入窗口中
                if (rect) {
                    content.value.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                    content.value.style.transform = rect.transform;
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
            if (content.value && container.value) {
                node.append(container.value, content.value);
            }
        }, delay);
    },
};

//* 侦听器, 用于侦听visible属性, 对窗口进行隐藏
const stop = watch(
    () => define.visible,
    () => {
        define.visible && content.value && view.hidden(0);
    }
);

//* 将视图控制器暴露出去
defineExpose({ view });
//* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
onBeforeUnmount(() => {
    stop && stop();
    timer.value && clearTimeout(timer.value);
    content.value && node.remove("ui-windows", content.value);
});
</script>
