//* Vue
import { ref, computed, nextTick } from "vue";
import type { SetupContext } from "vue";
//* 工具函数
import { node, dispose, animations } from "@various/utils";
//* 公共变量
import type { UiTypes } from "@various/constants";
//* 类型
import { type UiTooltipFunctionProps, UiTooltipFunctionEmits } from "../index";

export const useComposable = (define: UiTooltipFunctionProps, emits: SetupContext<typeof UiTooltipFunctionEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        data: ref<{ align: UiTypes.align; option: { pageX: number; pageY: number } }>(), //* 数据缓存
        active: ref<boolean>(false), //* 激活状态
        visible: ref<boolean>(false), //* 隐藏状态
        visibleTimer: ref<NodeJS.Timeout>(), //* 隐藏状态延迟器
    };

    //* 节点
    const nodes = {
        tooltip: ref<HTMLDivElement>(),
    };

    //* 函数列表
    const methods = {
        //* 视图控制器 显示
        show: (align: UiTypes.align, option: { pageX: number; pageY: number }) => {
            refs.visibleTimer.value && clearTimeout(refs.visibleTimer.value);
            refs.visibleTimer.value = undefined;
            refs.visible.value = true;
            nextTick(() => {
                if (nodes.tooltip.value) {
                    //* 数据缓存
                    refs.data.value = { align, option };
                    //* 将content添加到视图容器中
                    node.append(document.body, nodes.tooltip.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeMouseBody(option, nodes.tooltip.value, {
                        alignY: align,
                        offsetX: define.offsetX,
                        offsetY: define.offsetY,
                    });
                }
            });
        },

        //* 视图控制器 隐藏
        hidden: (delay: number = 200) => {
            refs.visibleTimer.value && clearTimeout(refs.visibleTimer.value);
            refs.visibleTimer.value = setTimeout(() => {
                refs.visible.value = false;
            }, delay);
        },

        //* 入场前样式调整
        entrancePreAnimation: (el: Element) => {
            gsap.set(el, { opacity: 0 });
        },

        //* 入场动画
        entranceAnimation: (el: Element, done: () => void) => {
            gsap.to(el, { duration: 0.2, opacity: 1, onComplete: () => done() });
        },

        //* 离场动画
        departureAnimation: (el: Element, done: () => void) => {
            gsap.to(el, { duration: 0.2, opacity: 0, onComplete: () => done() });
        },
    };

    //* 计算属性
    const computeds = {
        //* 样式
        style: computed(() => {
            //* 初始化数据
            const result: any = {
                zIndex: define.zIndex || 66,
            };

            //* 添加宽度
            if (define.width) result["max-width"] = `${define.width}px`;

            return result;
        }),
    };

    //* 处理函数列表
    const ons = {
        animation: animations.tooltip({
            afterEnter: () => emits("after-enter"),
            afterLeave: () => emits("after-leave"),
            beforeEnter: () => {
                refs.active.value = true;
                emits("before-enter");
            },
            beforeLeave: () => {
                refs.active.value = false;
                emits("before-leave");
            },
        }),

        content: {
            mouseleave: () => methods.hidden(),
            mouseenter: () => {
                refs.visible.value = true;
                refs.data.value && methods.show(refs.data.value.align, refs.data.value.option);
            },
        },
    };

    return { ons, refs, nodes, methods, computeds };
};
