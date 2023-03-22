import { UiModalProps, UiModalEmits } from "./modal";
import { computed, ComputedRef, nextTick } from "vue";
import { UiEmitFn } from "@various/constants";
import _ from "lodash";

export type UiModalConstructorRefs = {
    open: Boolean;
    main?: HTMLDivElement;
    container?: HTMLDivElement;
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
        const init = () => {
            nextTick(() => {
                if (!this.refs.container || !this.refs.main) return;
                if (this.refs.container.offsetHeight >= window.innerHeight) {
                    this.refs.main.style.alignItems = "flex-start";
                } else {
                    this.refs.main.style.alignItems = "center";
                }
            });
        };

        return {
            openModal: () => {
                if (!this.refs.main) return;
                window.addEventListener("resize", init);
                document.body.style.overflow = "hidden";
                this.refs.open = true;
                emit("open");
                init();
            },

            closeModal: () => {
                if (!this.refs.main) return;
                window.removeEventListener("resize", init);
                document.body.style.overflow = "";
                this.refs.open = false;
                emit("close");
            },
        };
    }
}
