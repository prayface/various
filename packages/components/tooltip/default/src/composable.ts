//* 公共插件
import { gsap } from "gsap";
import { computed, nextTick, ref } from "vue";
//* 工具函数
import { dispose, node } from "@various/utils";
//* 类型
import { UiTooltipProps } from "../index";

//* 组合函数
export const useComposable = (define: UiTooltipProps) => {
    //* 响应式变量
    const refs = {
        //* HTML节点
        main: ref<HTMLDivElement>(),
        tooltip: ref<HTMLDivElement>(),
        triangle: ref<HTMLDivElement>(),

        //* 显示控制变量
        visible: ref<boolean>(false),
        visibleTimer: ref<NodeJS.Timer>(),
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
                if (!refs.main.value || !refs.tooltip.value) return;
                else {
                    //* 将内容添加到视图容器中
                    node.append(document.body, refs.tooltip.value);
                    //* 根据配置计算当前窗口位置
                    const rect = dispose.boundary.relativeContainerBody(refs.main.value, refs.tooltip.value, {
                        direction: define.direction,
                        offset: define.offset,
                        align: define.align,
                        width: define.width,
                    });

                    //* 判断是否需要调整小三角位置
                    if (rect.triangle && refs.triangle.value) {
                        refs.triangle.value.style.inset = rect.triangle;
                        refs.triangle.value.style.transform = `rotate(${rect.rotate})`;
                    }
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
            //* 鼠标移入事件
            mouseenter: () => {
                if (define.trigger == "hover" && !define.disabled) {
                    methods.show();
                }
            },

            //* 鼠标移出事件
            mouseleave: () => {
                if (define.trigger == "hover" && !define.disabled) {
                    methods.hidden();
                }
            },
        },

        //* content处理函数
        contentHandles: {
            //* 鼠标移入事件
            mouseenter: () => {
                if (define.trigger == "hover" && !define.disabled) {
                    methods.show();
                }
            },

            //* 鼠标移出事件
            mouseleave: () => {
                if (define.trigger == "hover" && !define.disabled) {
                    methods.hidden();
                }
            },
        },
    };

    return { refs, methods, computeds, methodsOn };
};
