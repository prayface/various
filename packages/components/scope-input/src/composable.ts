import _ from "lodash";
import { Emitter } from "mitt";
import { computed } from "vue";
import { UiScopeInputProps, UiScopeInputEmits } from "./scope-input";
import { UiEmitFn } from "@various/constants";

export default class {
    // TODO 后续代码不需要进行类型声明, class如果在constructor进行初始化会自动生成类型
    handles;
    methods;
    computeds;

    constructor(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
        this.handles = this.#useOnHandles(define, emit, emitter);
    }

    #useMethods(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        //? 清空事件
        const clear = () => {
            //TODO 这块地方是否有点多余, refs貌似获取的是dom
            emit("clear", "clear");
            emitter?.emit(define.name || "", "change");
        };

        return {
            clear,
        };
    }

    #useComputeds(define: UiScopeInputProps) {
        //? 组件状态
        const status = computed(() => {
            if (define.loading) {
                return { is: true, name: "loading" };
            } else if (define.disabled) {
                return { is: false, name: "disabled" };
            } else if (define.readonly) {
                return { is: false, name: "readonly" };
            } else {
                return { is: false, name: "default" };
            }
        });

        //? 标签响应式属性
        const attrs = computed(() => {
            // TODO 已经使用v-model了, 所以value属性是多余的
            const obj = {
                disabled: ["disabled", "loading"].includes(status.value.name),
                readonly: status.value.name == "readonly",
            }
            return {
                start: { ...obj, placeholder: define.placeholder?.start || "Start", },
                end: { ...obj, placeholder: define.placeholder?.end || "End", },
            };
        });

        //? 样式
        const style = computed(() => {
            // TODO 样式参考一下select需要进行格式处理
            //* 宽度处理
            if (_.isNumber(define.width)) return { width: define.width + "px" };
            else return { width: define.width };
        });

        //? 类名
        const className = computed(() => {
            //* 初始化输出列表
            const result: string[] = [];
            //* 判断是否是禁用或只读状态
            if (status.value.name == "disabled") result.push("ui-disabled-status");
            else if (status.value.name == "readonly") result.push("ui-readonly-status");
            else if (status.value.name == "loading") result.push("ui-loading-status");
            //* 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);

            return result.join(" ");
        });

        return {
            className,
            status,
            attrs,
            style,
        };
    }

    #useOnHandles(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        return {
            handles: {
                change: (ev: Event) => {
                    console.log("change");
                    emit("change", ev);
                    emitter?.emit(define.name || "", "change");
                },
                input: (ev: InputEvent | Event) => {
                    emit("input", ev as InputEvent);
                },
                focus: (ev: FocusEvent | Event) => {
                    emit("focus", ev);
                },
                blur: (ev: FocusEvent | Event) => {
                    emit("blur", ev);
                    emitter?.emit(define.name || "", "blur");
                },
            },
        };
    }
}
