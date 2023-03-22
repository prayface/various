import { UiTooltipProps } from "../tooltip";
import { computed, ComputedRef } from "vue";


export default class {
    computeds: {
        style: ComputedRef<string>;
        className: ComputedRef<string>;
    };

    constructor(define: UiTooltipProps) {
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiTooltipProps) {
        return {
            //* 样式
            style: computed(() => (define.width ? `min-width: ${define.width}px` : "")),
            //* 类名
            className: computed(() => {
                return define.effect ? `ui-effect-${define.effect}` : "";
            }),
        };
    }
}
