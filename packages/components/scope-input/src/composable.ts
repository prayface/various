import _ from "lodash";
import { Emitter } from "mitt";
import { computed } from "vue";
import { UiScopeInputProps, UiScopeInputEmits } from "./scope-input";
import { UiEmitFn } from "@various/constants";


export type UiScopeInputRefs = {
    active: boolean;
};

export default class {
    refs: UiScopeInputRefs;
    handles;
    methods;
    computeds;

    constructor(refs: UiScopeInputRefs, define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        this.refs = refs
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(refs, define);
        this.handles = this.#useOnHandles(refs, define, emit, emitter);
    }

    #useMethods(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        //? 清空事件
        const clear = () => {
            emit("update:modelValue", {
                start: '',
                end: ''
            });
            emit("clear", "clear");
            emitter?.emit(define.name || "", "change");
        };

        return {
            clear,
        };
    }

    #useComputeds(refs: UiScopeInputRefs, define: UiScopeInputProps) {
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
            //* 判断是否激活
            if (refs.active) result.push("ui-active");

            return result.join(" ");
        });

        return {
            className,
            status,
            attrs,
            style,
        };
    }

    #useOnHandles(refs: UiScopeInputRefs, define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        return {
            handles: {
                change: (ev: Event) => {
                    emit("change", ev);
                    emitter?.emit(define.name || "", "change");
                },
                input: (ev: InputEvent | Event) => {
                    emit("input", ev as InputEvent);
                },
                focus: (ev: FocusEvent | Event) => {
                    refs.active = true
                    emit("focus", ev);
                },
                blur: (ev: FocusEvent | Event) => {
                    refs.active = false
                    emit("blur", ev);
                    emitter?.emit(define.name || "", "blur");
                },
            },
        };
    }
}
