import { UiTooltipProps } from "../tooltip";
import { computed, useAttrs } from "vue";

export default class {
    computeds;
    constructor(define: UiTooltipProps) {
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiTooltipProps) {
        return {
            //* 标签属性
            attrs: computed(() => useAttrs()),
            //* 样式
            style: computed(() => (define.width ? `max-width: ${define.width}px` : "")),
            //* 类名
            className: computed(() => {
                return define.effect ? `ui-effect-${define.effect}` : "";
            }),
        };
    }
}
