import { computed, ComputedRef } from "vue";
import { UiSeamlessScrollProps } from "./seamless-scroll";
import { utility } from "@various/utils";

export type UiSeamlessScrollConstructorRefs = {
    main?: HTMLDivElement;
    content?: HTMLDivElement;
    container?: HTMLDivElement;
    offset: number;
    frame?: number;
};

export default class {
    refs: UiSeamlessScrollConstructorRefs;

    computeds: {
        style: ComputedRef<{ [name: string]: any }>;
    };

    methods: {
        animation: () => void;
        mouseenter: () => void;
        mouseleave: () => void;
    };

    constructor(refs: UiSeamlessScrollConstructorRefs, define: UiSeamlessScrollProps) {
        this.refs = refs;
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define);
    }

    #useComputeds(define: UiSeamlessScrollProps) {
        return {
            style: computed(() => {
                //* 高度处理
                if (utility.isNumber(define.height)) return { height: define.height + "px" };
                else return { height: define.height };
            }),
        };
    }

    #useMethods(define: UiSeamlessScrollProps) {
        return {
            animation: () => {
                //* 判断是否向下执行
                if (!this.refs.container || !this.refs.content || !this.refs.main) return;
                if (this.refs.offset >= this.refs.content.offsetWidth) {
                    this.refs.offset = 0;
                } else {
                    this.refs.offset += define.delay;
                }

                //* 绘制
                this.refs.container.style.transform = `translateX(-${this.refs.offset}px)`;
                //* 触发下一帧绘制
                this.refs.frame = window.requestAnimationFrame(this.methods.animation);
            },

            mouseenter: () => {
                this.refs.frame && window.cancelAnimationFrame(this.refs.frame);
            },

            mouseleave: () => {
                //* 判断是否向下执行
                if (!this.refs.container || !this.refs.content || !this.refs.main) return;
                //* 无缝滚动
                this.refs.frame = window.requestAnimationFrame(this.methods.animation);
            },
        };
    }
}
