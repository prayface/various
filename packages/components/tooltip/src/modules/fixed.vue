<template>
    <div v-show="!visible" class="ui-tooltip" ref="main" v-on="hanlders">
        <slot name="default"></slot>
    </div>

    <Transition>
        <div class="ui-tooltip-container" v-if="view.visible" ref="container" :style="style" :class="className" v-on="containerHanlders">
            <div class="ui-tooltip-triangle" ref="triangle"></div>
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{ content }}</template>
        </div>
    </Transition>
</template>

<script lang="ts">
import Composable, { UiTooltipConstructorRefs } from "./composable";
import { node, dispost } from "@various/utils";
import { UiTooltipPropsOption } from "../tooltip";
import { defineComponent, nextTick, onBeforeUnmount, watch, ref, reactive, toRefs } from "vue";

export default defineComponent({
    name: "UiTooltip",
    props: UiTooltipPropsOption,
    setup(define) {
        //* 初始化响应式变量
        const refs = reactive<UiTooltipConstructorRefs>({
            main: undefined,
            triangle: undefined,
            container: undefined,
        });

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
                    if (refs.main && refs.container) {
                        //* 将content添加到视图容器中
                        node.append("ui-windows", refs.container);
                        //* 根据配置计算当前窗口位置
                        const rect = dispost.elementToContainerBoundary(dispost.elementToBodyRect(refs.main), dispost.elementToBodyRect(refs.container), {
                            direction: define.direction,
                            align: define.align,
                        });
                        //* 将窗口位置添加入窗口中
                        if (rect) {
                            refs.container.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                            refs.container.style.transform = rect.transform;
                            if (rect.triangle && refs.triangle) {
                                refs.triangle.style.inset = rect.triangle;
                                refs.triangle.style.transform = `rotate(${rect.rotate})`;
                            }
                        }
                    }
                });
            },
        });

        //* 实例化组合类
        const composable = new Composable(refs, define, view);

        //* ui-tooltip的处理函数
        const hanlders = {
            click: () => composable.methods.trigger("click", true),
            mouseenter: () => composable.methods.trigger("hover", true),
            mouseleave: () => composable.methods.trigger("hover", false),
        };

        //* ui-tooltip-container的处理函数
        const containerHanlders = {
            mouseenter: () => composable.methods.triggerView(true, timer.value),
            mouseleave: () => composable.methods.triggerView(false, timer.value),
        };

        //* 侦听器, 用于侦听visible属性, 对窗口进行隐藏
        const stop = watch(
            () => define.visible,
            () => {
                define.visible && refs.container && view.hidden(0);
            }
        );

        //* 组件销毁前, 判断是否存在窗口残留, 存在则移除DOM
        onBeforeUnmount(() => {
            stop && stop();
            timer.value && clearTimeout(timer.value);
            refs.container && node.remove("ui-windows", refs.container);
        });

        return {
            ...composable.computeds,
            hanlders: hanlders,
            containerHanlders: containerHanlders,
            view:view,
            ...toRefs(view),
        };
    },
});
</script>
