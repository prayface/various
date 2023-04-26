import _ from "lodash";
import { computed, useAttrs } from "vue";
import { UiCarouselProps, UiCarouselMultipleViewProps } from "./carousel";

export default class {
    computeds;
    constructor(define: UiCarouselProps | UiCarouselMultipleViewProps) {
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiCarouselProps | UiCarouselMultipleViewProps) {
        return {
            attrs: computed(() => useAttrs()),
            style: computed(() => {
                const result: { [name: string]: any } = {};
                //* 宽度处理
                if (define.width) {
                    if (_.isNumber(define.width)) result.width = define.width + "px";
                    else result.width = define.width;
                }

                //* 高度处理
                if (define.height) {
                    if (_.isNumber(define.height)) result.height = define.height + "px";
                    else result.height = define.height;
                }

                return result;
            }),
        };
    }
}
