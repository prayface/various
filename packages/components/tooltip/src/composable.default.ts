import { gsap } from "gsap";
import { nextTick, computed } from "vue";
import { UiTooltipProps } from "./tooltip";
import { node, dispose } from "@various/utils";

export type UiTooltipConstructorRefs = {
    main?: HTMLDivElement;
    tooltip?: HTMLDivElement;
    triangle?: HTMLDivElement;
    visible: boolean;
    timer?: NodeJS.Timer;
};

export default class {
    refs;
    methods;
    handles;
    computeds;

    constructor(refs: UiTooltipConstructorRefs, define: UiTooltipProps) {
        this.refs = refs;
        this.methods = this.#useMethods(define);
        this.handles = this.#useOnHandles(define);
        this.computeds = this.#useComputeds(define);
    }

    #useMethods(define: UiTooltipProps) {
        return {
            //* 视图控制器 显示
            show: () => {
                this.refs.timer && clearTimeout(this.refs.timer);
                this.refs.timer = undefined;
                this.refs.visible = true;
                nextTick(() => {
                    if (!this.refs.main || !this.refs.tooltip) return;

                    //* 将内容添加到视图容器中
                    node.append(document.body, this.refs.tooltip);

                    //* 根据配置计算当前窗口位置
                    const rect = dispose.boundary.relativeContainerBody(this.refs.main, this.refs.tooltip, {
                        direction: define.direction,
                        offset: define.offset,
                        align: define.align,
                        width: define.width,
                    });

                    //* 判断是否需要调整小三角位置
                    if (rect.triangle && this.refs.triangle) {
                        this.refs.triangle.style.inset = rect.triangle;
                        this.refs.triangle.style.transform = `rotate(${rect.rotate})`;
                    }
                });
            },

            //* 视图控制器 隐藏
            hidden: (delay: number = 200) => {
                this.refs.timer && clearTimeout(this.refs.timer);
                this.refs.timer = setTimeout(() => {
                    this.refs.visible = false;
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
    }

    #useOnHandles(define: UiTooltipProps) {
        return {
            //* 主体处理函数
            mainHandles: {
                mouseenter: () => {
                    if (define.trigger == "hover" && !define.disabled) {
                        this.methods.show();
                    }
                },
                mouseleave: () => {
                    if (define.trigger == "hover" && !define.disabled) {
                        this.methods.hidden();
                    }
                },
            },

            //* 内容的处理函数
            tooltipHandles: {
                mouseenter: () => {
                    if (define.trigger == "hover" && !define.disabled) {
                        this.refs.timer && clearTimeout(this.refs.timer);
                        this.refs.timer = undefined;
                        this.methods.show();
                    }
                },
                mouseleave: () => {
                    if (define.trigger == "hover" && !define.disabled) {
                        this.refs.timer && clearTimeout(this.refs.timer);
                        this.refs.timer = undefined;
                        this.methods.hidden();
                    }
                },
            },
        };
    }

    #useComputeds(define: UiTooltipProps) {
        return {
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
    }
}
