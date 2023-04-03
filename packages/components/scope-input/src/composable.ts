import _ from "lodash";
import { Emitter } from "mitt";
import { computed, ComputedRef } from "vue";
import { UiScopeInputProps, UiScopeInputEmits } from "./scope-input";
import { UiEmitFn } from "@various/constants";


export default class {

    handles: {
        handles: {
            change: (ev: Event) => void;
            input: (ev: InputEvent | Event) => void;
            focus: (ev: FocusEvent | Event) => void;
            blur: (ev: FocusEvent | Event) => void;
        };
    };

    methods: {
        clear: () => void;
    };

    computeds: {
        style: ComputedRef<{ width?: string }>;
        attrs: ComputedRef<{ [name: string]: any }>;
        status: ComputedRef<{ is: boolean; name: string }>;
        className: ComputedRef<string>;
    };

    constructor(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
        this.handles = this.#useOnHandles(define, emit, emitter);
    }

    #useMethods(define: UiScopeInputProps, emit: UiEmitFn<typeof UiScopeInputEmits>, emitter?: Emitter<any>) {

        //? 清空事件
        const clear = () => {
            console.log('clear');
            // emit("update:modelValue", "");
            emit("clear", "clear");
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
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
            //* 过滤define
            return {
                value: define.modelValue,
                disabled: ["disabled", "loading"].includes(status.value.name),
                readonly: status.value.name == "readonly",
                placeholder: define.placeholder || { start: 'Start', end: 'End' },
            };
        });

        //? 样式
        const style = computed(() => {
            if (define.width) return { width: define.width + "px" };
            else return {};
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
                    console.log('change');
                    emit("change", ev);
                    emitter?.emit(define.name || "", "change");
                },
                input: (ev: InputEvent | Event) => {
                    const target = ev.target as HTMLInputElement;

                    console.log(target.type);
                    // emit("update:modelValue", data);
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
