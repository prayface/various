//* 公共插件
import { computed, nextTick, ref } from "vue";
import type { SetupContext } from "vue";
//* 工具函数
import { animations, dispose, node } from "@various/utils";
//* 类型
import { type UiTooltipProps, UiTooltipEmits } from "../index";

//* 组合函数
export const useComposable = (define: UiTooltipProps, emits: SetupContext<typeof UiTooltipEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        active: ref<boolean>(false), //* 激活状态
        visible: ref<boolean>(false), //* 隐藏状态
        visibleTimer: ref<NodeJS.Timeout>(), //* 隐藏状态延迟器
    };

    //* 节点
    const nodes = {
        container: ref<HTMLDivElement>(),
        triangle: ref<HTMLDivElement>(),
        tooltip: ref<HTMLDivElement>(),
    };

    //* 函数列表
    const methods = {
        //* 视图控制器 显示
        show: () => {
            //* 数据初始化
            refs.visibleTimer.value && clearTimeout(refs.visibleTimer.value);
            refs.visibleTimer.value = undefined;
            refs.visible.value = true;
            nextTick(() => {
                //* 检测是否满足运行条件
                if (!nodes.container.value || !nodes.tooltip.value) return;
                else {
                    //* 将内容添加到视图容器中
                    node.append(document.body, nodes.tooltip.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(
                        { container: nodes.container.value, triangle: nodes.triangle.value, view: nodes.tooltip.value },
                        {
                            direction: define.direction,
                            offset: define.offset,
                            align: define.align,
                            width: define.width,
                        }
                    );
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
            //* 鼠标点击事件
            click: () => define.trigger == "click" && methods.show(),
            //* 鼠标移入事件
            mouseenter: () => define.trigger == "hover" && methods.show(),
            //* 鼠标移出事件
            mouseleave: () => (define.trigger == "hover" || define.trigger == "click") && methods.hidden(),
        },

        content: {
            //* 鼠标移入事件
            mouseenter: () => (define.trigger == "hover" || define.trigger == "click") && methods.show(),
            //* 鼠标移出事件
            mouseleave: () => (define.trigger == "hover" || define.trigger == "click") && methods.hidden(),
        },
    };

    return { ons, refs, nodes, methods, computeds };
};
