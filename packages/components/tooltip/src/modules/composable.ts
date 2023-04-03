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
                const result = [];

                define.classExtraName && result.push(define.classExtraName);
                define.effect && result.push(`ui-effect-${define.effect}`);

                return result.join(" ");
            }),
        };
    }
}
