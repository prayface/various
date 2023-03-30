import { UiScrollbarProps } from "./scrollbar";
import { computed, ComputedRef } from "vue";

export type UiScrollbarConstructorRefs = {
    container?: HTMLDivElement;
    content?: HTMLDivElement;
    scroll: any;
    scrollbarX: any;
    scrollbarY: any;
    real: any;
    abs: any;
};

export default class {
    refs: UiScrollbarConstructorRefs;

    computeds: {
        style: ComputedRef<{ [name: string]: any }>;
        stylesContent: ComputedRef<{ [name: string]: any }>;
        stylesScrollbarX: ComputedRef<{ [name: string]: any }>;
        stylesScrollbarY: ComputedRef<{ [name: string]: any }>;
    };

    methods: {
        init: () => void;
        disposeWheel: (offset: number, size: number, max: number) => number;
        disposeSize: (rw: number, aw: number, ratio: number) => object;
        onScroll: (is: boolean, ev: MouseEvent) => void;
    };

    constructor(refs: UiScrollbarConstructorRefs, define: UiScrollbarProps) {
        this.refs = refs;
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define);
    }

    #useComputeds(define: UiScrollbarProps) {
        return {
            //* 主体样式
            style: computed(() => {
                const result: { [name: string]: any } = {
                    width: define.width ? `${define.width}px` : "100%",
                    height: define.height ? `${define.height}px` : "100%",
                    overflow: "hidden",
                };

                return result;
            }),

            //* 滚动条内容样式
            stylesContent: computed(() => {
                return {
                    transition: this.refs.scroll.drag ? "none" : "all 0.2s",
                    transform: `translate(-${this.refs.scroll.real.left}px, -${this.refs.scroll.real.top}px)`,
                };
            }),
            //* X轴滑块样式
            stylesScrollbarX: computed(() => {
                return {
                    left: `${this.refs.scrollbarX.offset}px`,
                    width: `${this.refs.scrollbarX.size}px`,
                    transform: `translateX(${this.refs.scroll.abs.left}px)`,
                    transition: this.refs.scrollbarX.drag ? "none" : "all 0.2s",
                };
            }),
            //* Y轴滑块样式
            stylesScrollbarY: computed(() => {
                return {
                    top: `${this.refs.scrollbarY.offset}px`,
                    height: `${this.refs.scrollbarY.size}px`,
                    transform: `translateY(${this.refs.scroll.abs.top}px)`,
                    transition: this.refs.scrollbarY.drag ? "none" : "all 0.2s",
                };
            }),
        };
    }

    #useMethods(define: UiScrollbarProps) {
        return {
            //* 初始化样式
            init: () => {
                // 真实尺寸、 相对尺寸、 转换比例
                if (this.refs.content && this.refs.container) {
                    //* 1. 获取内容的尺寸
                    const contentRect = this.refs.content.getBoundingClientRect();
                    this.refs.real.height = contentRect.height;
                    this.refs.real.width = contentRect.width;
                    //* 2. 获取容器的尺寸
                    const containerRect = this.refs.container.getBoundingClientRect();
                    this.refs.abs.height = containerRect.height;
                    this.refs.abs.width = containerRect.width;
                    //* 3. 计算各自的转换比例
                    this.refs.real.ratioY = this.refs.abs.height / this.refs.real.height;
                    this.refs.real.ratioX = this.refs.abs.width / this.refs.real.width;
                    this.refs.abs.ratioY = this.refs.real.height / this.refs.abs.height;
                    this.refs.abs.ratioX = this.refs.real.width / this.refs.abs.width;
                    //* 4. 计算不同方向滚动条的尺寸和偏移
                    this.refs.scrollbarX = this.methods.disposeSize(this.refs.real.width, this.refs.abs.width, this.refs.real.ratioX);
                    this.refs.scrollbarY = this.methods.disposeSize(this.refs.real.height, this.refs.abs.height, this.refs.real.ratioY);
                    //* 5. 存在Y轴滚动条时挂载wheel事件
                    if (this.refs.scrollbarY.size) {
                        this.refs.container.onwheel = (ev: WheelEvent) => {
                            const offsetY = this.methods.disposeWheel(
                                this.refs.scroll.real.top + ev.deltaY,
                                this.refs.abs.height,
                                this.refs.real.height
                            );
                            if (this.refs.scroll.real.top != offsetY) {
                                this.refs.scroll.real.top = this.methods.disposeWheel(
                                    this.refs.scroll.real.top + ev.deltaY,
                                    this.refs.abs.height,
                                    this.refs.real.height
                                );
                                this.refs.scroll.abs.top = this.refs.scroll.real.top * this.refs.real.ratioY;
                                ev.preventDefault();
                            }
                        };
                    }
                }
            },
            //* 计算当前滚动位置
            disposeWheel: (offset: number, size: number, max: number) => {
                if (offset < 0) return 0;
                else if (offset + size > max) return max - size;
                else return offset;
            },

            //* 计算Bar尺寸和滚动条偏移
            disposeSize: (rw: number, aw: number, ratio: number) => {
                if (rw <= aw) return { size: 0, offset: 0, drag: false };
                else if (ratio * aw < 20) return { size: 20, offset: 10, drag: false };
                else return { size: ratio * aw, offset: 0, drag: false };
            },

            //* 响应滚动条滑块拖动事件
            onScroll: (is: boolean, ev: MouseEvent) => {
                this.refs.scroll.drag = true;
                const size = is ? ev.x : ev.y;
                const offset = is ? this.refs.scroll.abs.left : this.refs.scroll.abs.top;
                document.onselectstart = () => false;
                document.onmousemove = (ev: MouseEvent) => {
                    if (is) {
                        this.refs.scrollbarX.drag = true;
                        this.refs.scroll.abs.left = this.methods.disposeWheel(offset + ev.x - size, this.refs.scrollbarX.size, this.refs.abs.width);
                        this.refs.scroll.real.left = this.refs.scroll.abs.left * this.refs.abs.ratioX;
                    } else {
                        this.refs.scrollbarY.drag = true;
                        this.refs.scroll.abs.top = this.methods.disposeWheel(offset + ev.y - size, this.refs.scrollbarY.size, this.refs.abs.height);
                        this.refs.scroll.real.top = this.refs.scroll.abs.top * this.refs.abs.ratioY;
                    }
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.refs.scroll.drag = false;
                    if (is) this.refs.scrollbarX.drag = false;
                    else this.refs.scrollbarY.drag = false;
                };
            },
        };
    }
}
