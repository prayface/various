import { UiModalProps, UiModalEmits } from "./modal";
import { computed, ComputedRef } from "vue";
import { UiEmitFn } from "@various/constants";
import _ from "lodash";

export type UiModalConstructorRefs = {
    open: Boolean;
};

export default class {
    refs: UiModalConstructorRefs;

    methods: {
        openModal: () => void;
        closeModal: () => void;
    };

    computeds: {
        style: ComputedRef<{ [name: string]: any }>;
    };

    constructor(refs: UiModalConstructorRefs, define: UiModalProps, emit: UiEmitFn<typeof UiModalEmits>) {
        this.refs = refs;
        this.methods = this.#useMethods(emit);
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiModalProps) {
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

    #useMethods(emit: UiEmitFn<typeof UiModalEmits>) {
        return {
            openModal: () => {
                this.refs.open = true;
                emit("open");
            },

            closeModal: () => {
                this.refs.open = false;
                emit("close");
            },
        };
    }
}
