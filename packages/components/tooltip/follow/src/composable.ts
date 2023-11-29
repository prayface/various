//* Vue
import { ref, computed, nextTick } from "vue";
import type { SetupContext } from 'vue'
//* 工具函数
import { node, dispose, animations } from "@various/utils";
//* 类型
import { type UiTooltipFollowProps, UiTooltipFollowEmits } from "../index";

//* 组合函数
export const useComposable = (define: UiTooltipFollowProps, emits: SetupContext<typeof UiTooltipFollowEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        event: ref<MouseEvent>(), //* Event缓存
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
        show: (ev: MouseEvent) => {
            refs.visibleTimer.value && clearTimeout(refs.visibleTimer.value);
            refs.visibleTimer.value = undefined;
            refs.visible.value = true;
            nextTick(() => {
                if (ev && nodes.tooltip.value) {
                    //* 将event缓存中
                    refs.event.value = ev;
                    //* 将content添加到视图容器中
                    node.append(document.body, nodes.tooltip.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeMouseBody(ev, nodes.tooltip.value, {
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

        container: {
            mouseenter: (ev: MouseEvent) => methods.show(ev),
            mouseleave: () => methods.hidden(),
            mousemove: (ev: MouseEvent) => methods.show(ev),
        },

        content: {
            mouseleave: () => methods.hidden(),
            mouseenter: () => {
                refs.visible.value = true;
                refs.event.value && methods.show(refs.event.value);
            },
        },
    };

    return { ons, refs, nodes, methods, computeds };
};
