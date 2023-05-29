import { gsap } from "gsap";
import { computed, nextTick } from "vue";

import { UiTypes } from "@various/constants";

import { UiTooltipFunctionProps } from "./tooltip";
import { node, dispose } from "@various/utils";

export type UiTooltipConstructorRefs = {
    main?: HTMLDivElement;
    tooltip?: HTMLDivElement;
    visible: boolean;
    timer?: NodeJS.Timer;
};

export default class {
    refs;
    handles;
    methods;
    computeds;

    constructor(refs: UiTooltipConstructorRefs, define: UiTooltipFunctionProps) {
        this.refs = refs;
        this.handles = this.#useOnHandles();
        this.methods = this.#useMethods(define);
        this.computeds = this.#useComputeds(define);
    }

    #useMethods(define: UiTooltipFunctionProps) {
        return {
            //* 视图控制器 显示
            show: (align: UiTypes.align, option: { pageX: number; pageY: number }) => {
                this.refs.timer && clearTimeout(this.refs.timer);
                this.refs.timer = undefined;
                this.refs.visible = true;
                nextTick(() => {
                    if (this.refs.tooltip) {
                        //* 将content添加到视图容器中
                        node.append(document.body, this.refs.tooltip);
                        //* 根据配置计算当前窗口位置
                        dispose.boundary.relativeMouseBody(option, this.refs.tooltip, {
                            align: align,
                            offsetX: define.offsetX,
                            offsetY: define.offsetY,
                        });
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
                gsap.killTweensOf(el);
                gsap.to(el, { duration: 0.2, opacity: 1, onComplete: () => done() });
            },

            //* 离场动画
            departureAnimation: (el: Element, done: () => void) => {
                gsap.killTweensOf(el);
                gsap.to(el, { duration: 0.2, opacity: 0, onComplete: () => done() });
            },
        };
    }

    #useComputeds(define: UiTooltipFunctionProps) {
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

    #useOnHandles() {
        return {
            //* 内容的处理函数
            tooltipHandles: {
                mouseleave: () => this.methods.hidden(),
                mouseenter: () => {
                    this.refs.timer && clearTimeout(this.refs.timer);
                    this.refs.timer = undefined;
                    this.refs.visible = true;
                },
            },
        };
    }
}
