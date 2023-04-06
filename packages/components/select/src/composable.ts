import _ from "lodash";
import { Emitter } from "mitt";
import { nextTick, computed } from "vue";
import { UiSelectProps, UiSelectEmits } from "./select";
import { UiEmitFn } from "@various/constants";
import { node, dispose } from "@various/utils";

export type UiSelectConstructorRefs = {
    visible: boolean;
    triangle?: HTMLElement;
    container?: HTMLElement;
    candidate?: HTMLElement;
};

export default class {
    refs;
    methods;
    computeds;

    constructor(refs: UiSelectConstructorRefs, define: UiSelectProps, emit: UiEmitFn<typeof UiSelectEmits>, emitter?: Emitter<any>) {
        this.refs = refs;
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
    }

    #useMethods(define: UiSelectProps, emit: UiEmitFn<typeof UiSelectEmits>, emitter?: Emitter<any>) {
        //? 候选框隐藏事件
        const hidden = (ev?: Event) => {
            if (!this.refs.container) return;
            if (ev?.target && node.includes(ev.target as HTMLElement, this.refs.container)) return;
            else {
                this.refs.visible = false;
                window.removeEventListener("click", hidden);
            }
        };

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
            //* 判断选择框是否处于异常状态
            if (this.computeds.status.value.name != "default") return;
            //* 判断候选项是否已被激活
            if (this.refs.visible) {
                hidden();
            } else {
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

                    //* 隐藏事件
                    window.addEventListener("click", hidden, true);
                });
            }
        };

        //? 候选项选择事件
        const cutCandidate = (content: String, ev: Event) => {
            emit("update:modelValue", content);
            emit("change", ev);
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }

            if (this.refs.visible) {
                hidden();
            }
        };

        return {
            cutCandidate,
            hidden,
            clear,
            show,
        };
    }

    #useComputeds(define: UiSelectProps) {
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
            const disabled = ["disabled", "loading"].includes(status.value.name);
            return {
                type: "text",
                value: define.modelValue,
                disabled: disabled,
                readonly: !disabled,
                placeholder: define.placeholder,
                autocomplete: false,
            };
        });

        //? 样式
        const style = computed(() => {
            //* 宽度处理
            if (_.isNumber(define.width)) return { width: define.width + "px" };
            else return { width: define.width };
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
            //* 判断候选项是否处于展示状态
            if (this.refs.visible) result.push("ui-candidates-show");

            return result.join(" ");
        });

        return {
            candidates,
            className,
            status,
            style,
            attrs,
        };
    }
}
