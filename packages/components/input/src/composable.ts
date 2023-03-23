import _ from "lodash";
import { Emitter } from "mitt";
import { nextTick, computed, ComputedRef } from "vue";
import { UiInputProps, UiInputEmits } from "./input";
import { UiEmitFn, UiTypes } from "@various/constants";
import { node, dispost } from "@various/utils";

export type UiInputConstructorRefs = {
    main?: HTMLElement;
    visible: boolean;
    triangle?: HTMLElement;
    container?: HTMLElement;
};

export default class {
    refs: UiInputConstructorRefs;

    handles: {
        handles: {
            change: (ev: Event) => void;
            input: (ev: InputEvent | Event) => void;
            click: (ev: PointerEvent | Event) => void;
            focus: (ev: FocusEvent | Event) => void;
            blur: (ev: FocusEvent | Event) => void;
        };
    };

    methods: {
        clear: () => void;
        cutCandidate: (content: string, ev: Event) => void;
        showCandidate: () => void;
    };

    computeds: {
        style: ComputedRef<{ width?: string }>;
        attrs: ComputedRef<{ [name: string]: any }>;
        status: ComputedRef<{ is: boolean; name: string }>;
        className: ComputedRef<string>;
        candidates: ComputedRef<UiTypes.candidate[]>;
    };

    constructor(refs: UiInputConstructorRefs, define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        this.refs = refs;
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
        this.handles = this.#useOnHandles(define, emit, emitter);
    }

    #useMethods(define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        //? 候选框隐藏事件
        const hiddenCandidate = (ev?: Event) => {
            if (!ev || !this.refs.main || !node.includes(ev.target as HTMLElement, this.refs.main)) {
                this.refs.visible = false;
                window.removeEventListener("click", hiddenCandidate);
            }
        };

        return {
            //? 清空事件
            clear: () => {
                emit("update:modelValue", "");
                emit("clear", "clear");
                if (emitter?.emit) {
                    emitter.emit(define.name || "", "change");
                }
            },

            //? 候选项选择事件
            cutCandidate: (content: String, ev: Event) => {
                emit("update:modelValue", content);
                emit("change", ev);
                emit("input", ev);
                if (emitter?.emit) {
                    emitter.emit(define.name || "", "change");
                }

                if (this.refs.visible) {
                    hiddenCandidate();
                }
            },

            //? 候选框显示事件
            showCandidate: () => {
                this.refs.visible = true;
                nextTick(() => {
                    if (!this.refs.main || !this.refs.container) return;
                    //* 将内容添加到视图容器中
                    node.append("ui-windows", this.refs.container);

                    //* 获取节点到body距离
                    const mainToBodyRect = dispost.elementToBodyRect(this.refs.main);
                    const containerToBodyRect = dispost.elementToBodyRect(this.refs.container);
                    //* 根据配置计算当前窗口位置
                    const rect = dispost.elementToContainerBoundary(mainToBodyRect, containerToBodyRect, {
                        direction: "bottom",
                        align: "top",
                    });

                    //* 将窗口位置添加入窗口中
                    if (rect) {
                        this.refs.container.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                        this.refs.container.style.transform = rect.transform;
                        if (rect.triangle && this.refs.triangle) {
                            this.refs.triangle.style.inset = rect.triangle;
                            this.refs.triangle.style.transform = `rotate(${rect.rotate})`;
                        }
                    }

                    //* 隐藏事件
                    window.addEventListener("click", hiddenCandidate, true);
                });
            },
        };
    }

    #useComputeds(define: UiInputProps) {
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
                type: define.type,
                value: define.modelValue,
                disabled: ["disabled", "loading"].includes(status.value.name),
                readonly: status.value.name == "readonly",
                placeholder: define.placeholder,
                autocomplete: define.autocomplete,
            };
        });

        //? 样式
        const style = computed(() => {
            if (define.width) return { width: define.width + "px" };
            else return {};
        });

        //? 候选项
        const candidates = computed(() => {
            if (_.isArray(define.candidate)) return define.candidate;
            else if (_.isFunction(define.candidate)) {
                const result = define.candidate();
                if (_.isArray(result)) {
                    return result;
                }
            }

            return [];
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
            //* 判断是否需要添加clearable类名
            if (define.clearable) result.push("ui-clearable");

            return result.join(" ");
        });

        return {
            candidates,
            className,
            status,
            attrs,
            style,
        };
    }

    #useOnHandles(define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        return {
            handles: {
                change: (ev: Event) => {
                    emit("change", ev);
                    emitter?.emit(define.name || "", "change");
                },
                input: (ev: InputEvent | Event) => {
                    const target = ev.target as HTMLInputElement;
                    emit("update:modelValue", target.value);
                    emit("input", ev as InputEvent);
                },
                click: (ev: PointerEvent | Event) => {
                    emit("click", ev);
                    define.candidate && this.methods.showCandidate();
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
