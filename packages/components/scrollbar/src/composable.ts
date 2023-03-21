import { UiScrollbarProps } from "./scrollbar";
import { computed,ComputedRef } from "vue";

export default class {
    computeds: {
        style: ComputedRef<{ [name: string]: any }>;
    };

    methods: {
        dispostWheel: (offset: number, size: number, max: number) => number;
        dispostSize: (rw: number, aw: number, ratio: number) => object;
    };

    constructor(define: UiScrollbarProps) {
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define);
    }

    #useComputeds(define: UiScrollbarProps) {
        return{
             //* 主体样式
             style: computed(() => {
                const result: { [name: string]: any } = {
                    width: define.width ? `${define.width}px` : "100%",
                    height: define.height ? `${define.height}px` : "100%",
                    overflow: "hidden",
                };
    
                return result;
            }),
        }
    }

    #useMethods(define: UiScrollbarProps) {
        return {
            //* 计算当前滚动位置
            dispostWheel: (offset: number, size: number, max: number) => {
                if (offset < 0) return 0;
                else if (offset + size > max) return max - size;
                else return offset;
            },
    
            //* 计算Bar尺寸和滚动条偏移
            dispostSize: (rw: number, aw: number, ratio: number) => {
                if (rw <= aw) return { size: 0, offset: 0, drag: false };
                else if (ratio * aw < 20) return { size: 20, offset: 10, drag: false };
                else return { size: ratio * aw, offset: 0, drag: false };
            },
        };
    }
}
