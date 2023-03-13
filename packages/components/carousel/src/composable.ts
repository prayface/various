import _ from "lodash";
import { computed } from "vue";
import { UiCarouselProps } from "./carousel";

export default class {
    static useComputeds(define: UiCarouselProps) {
        return {
            style: computed(() => {
                const result: { [name: string]: any } = {};
                //* 宽度处理
                if (_.isNumber(define.width)) result.width = define.width + "px";
                else result.width = define.width;
                //* 高度处理
                if (_.isNumber(define.height)) result.height = define.height + "px";
                else result.height = define.height;
                return result;
            }),
        };
    }
}
