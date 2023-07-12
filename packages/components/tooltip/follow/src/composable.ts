//* 公共插件
import { gsap } from "gsap";
import { ref, computed, nextTick } from "vue";
//* 工具函数
import { node, dispose } from "@various/utils";
//* 类型
import { UiTooltipFollowProps } from "../index";

//* 组合函数
export const useComposable = (define: UiTooltipFollowProps) => {
    //* 响应式变量
    const refs = {
        //* HTML节点
        main: ref<HTMLDivElement>(),
        tooltip: ref<HTMLDivElement>(),

        //* 显示控制变量
        event: ref<MouseEvent>(),
        visible: ref<boolean>(false),
        visibleTimer: ref<NodeJS.Timer>(),
    };

    //* 函数列表
    const methods = {
        //* 视图控制器 显示
        show: (ev: MouseEvent) => {
            refs.visibleTimer.value && clearTimeout(refs.visibleTimer.value);
            refs.visibleTimer.value = undefined;
            refs.visible.value = true;
            nextTick(() => {
                if (ev && refs.tooltip.value) {
                    //* 将event缓存中
                    refs.event.value = ev;
                    //* 将content添加到视图容器中
                    node.append(document.body, refs.tooltip.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeMouseBody(ev, refs.tooltip.value, {
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
    const methodsOn = {
        //* main处理函数
        mainHandles: {
            mouseenter: (ev: MouseEvent) => methods.show(ev),
            mouseleave: () => methods.hidden(),
            mousemove: (ev: MouseEvent) => methods.show(ev),
        },

        //* content处理函数
        contentHandles: {
            mouseleave: () => methods.hidden(),
            mouseenter: () => {
                refs.visible.value = true;
                refs.event.value && methods.show(refs.event.value);
            },
        },
    };

    return { refs, methods, computeds, methodsOn };
};