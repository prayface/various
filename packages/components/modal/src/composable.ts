import { UiModalProps, UiModalEmits } from "./modal";
import { computed } from "vue";
import { UiEmitFn } from "@various/constants";
import _ from "lodash";

export type Refs = {
    open: Boolean;
};

export default class {
    refs: Refs;
    constructor(refs: Refs) {
        this.refs = refs;
    }

    useComputeds(define: UiModalProps) {
        return {
            //? 样式
            style: computed(() => {
                //* 1. 初始化返回数据
                const result: { [name: string]: any } = {
                    width: _.isNumber(define.width) ? define.width + "px" : define.width,
                    padding: define.spacing,
                };

                //* 2. 检测是否需要拉伸
                result[define.magnify ? "min-height" : "height"] = _.isNumber(define.height) ? define.height + "px" : define.height;

                return result;
            }),
        };
    }

    useMethods(define: UiModalProps, emits: UiEmitFn<typeof UiModalEmits>) {
        return {
            openModal: () => {
                this.refs.open = true;
                emits("open");
            },

            closeModal: () => {
                this.refs.open = false;
                emits("close");
            },
        };
    }
}
