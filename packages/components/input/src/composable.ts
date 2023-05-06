import _ from "lodash";
import { Emitter } from "mitt";
import { nextTick, computed } from "vue";
import { UiInputProps, UiInputEmits } from "./input";
import { UiEmitFn } from "@various/constants";
import { node, dispose } from "@various/utils";

export type UiInputConstructorRefs = {
    visible: boolean;
    triangle?: HTMLElement;
    container?: HTMLElement;
    candidate?: HTMLElement;
};

export default class {
    refs;
    handles;
    methods;
    computeds;

    constructor(refs: UiInputConstructorRefs, define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        this.refs = refs;
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
        this.handles = this.#useOnHandles(define, emit, emitter);
    }

    #useMethods(define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        //? 清空事件
        const clear = () => {
            emit("update:modelValue", "");
            emit("clear", "clear");
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        };

        //? 候选框显示事件
        const show = () => {
            //* 显示候选项列表
            this.refs.visible = true;
            nextTick(() => {
                if (!this.refs.container || !this.refs.candidate) return;
                //* 将内容添加到视图容器中
                node.append("ui-windows", this.refs.candidate);

                //* 根据配置计算当前窗口位置
                const rect = dispose.elementToContainerBoundary(this.refs.container, this.refs.candidate, {
                    offsetMain: 8,
                    direction: "bottom",
                    align: "start",
                });

                //* 判断是否需要调整小三角位置
                if (rect.triangle && this.refs.triangle) {
                    this.refs.triangle.style.inset = rect.triangle;
                    this.refs.triangle.style.transform = `rotate(${rect.rotate})`;
                }
            });
        };

        //? 候选项选择事件
        const cutCandidate = (content: String, ev: Event) => {
            emit("update:modelValue", content);
            emit("select", ev);
            emit("change", ev);
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        };

        //? 触发键盘回车事件
        const triggerKeydownEnter = () => {
            emit("enter", () => {
                this.refs.visible = false;
            });
        };

        return {
            triggerKeydownEnter,
            cutCandidate,
            clear,
            show,
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
            //* 判断候选项是否处于展示状态
            if (this.refs.visible) result.push("ui-candidates-show");

            return result.join(" ");
        });

        return {
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
                },
                focus: (ev: FocusEvent | Event) => {
                    this.methods.show();
                    emit("focus", ev);
                },
                blur: (ev: FocusEvent | Event) => {
                    this.refs.visible = false;
                    emit("blur", ev);
                    emitter?.emit(define.name || "", "blur");
                },
            },
        };
    }
}
