import _ from "lodash";
import { Emitter } from "mitt";
import { nextTick, computed } from "vue";
import { UiInputProps, UiInputEmits } from "./input";
import { UiEmitFn } from "@various/constants";
import { node, dispose } from "@various/utils";

export type UiInputConstructorRefs = {
    input?: HTMLElement;
    visible: boolean;
    triangle?: HTMLElement;
    container?: HTMLElement;
    candidate?: HTMLElement;
};

export default class {
    refs;
    methods;
    computeds;

    constructor(refs: UiInputConstructorRefs, define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        this.refs = refs;
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
    }

    #useMethods(define: UiInputProps, emit: UiEmitFn<typeof UiInputEmits>, emitter?: Emitter<any>) {
        //? 候选框显示事件
        const show = () => {
            //* 检测是否满足运行条件
            if (this.refs.visible) return;
            //* 显示候选项列表
            this.refs.visible = true;
            nextTick(() => {
                if (!this.refs.container || !this.refs.candidate) return;
                //* 将内容添加到视图容器中
                node.append("ui-windows", this.refs.candidate);

                //* 根据配置计算当前窗口位置
                const rect = dispose.boundary.relativeContainerBody(this.refs.container, this.refs.candidate, {
                    direction: "bottom",
                    offset: 8,
                    height: define.height,
                    width: this.refs.container?.offsetWidth || 0,
                    align: "start",
                });

                //* 判断是否需要调整小三角位置
                if (rect.triangle && this.refs.triangle) {
                    this.refs.triangle.style.inset = rect.triangle;
                    this.refs.triangle.style.transform = `rotate(${rect.rotate})`;
                }
            });
        };

        //? Input失去焦点事件
        const blur = (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input失去焦点
            if (!ev) return this.refs.input?.blur();
            else {
                //* 隐藏候选项
                this.refs.visible = false;

                //* 触发blur回调
                emit("blur", ev);

                //* 触发表单blur相关校验
                emitter?.emit(define.name || "", "blur");
            }
        };

        //? Input获取焦点事件
        const focus = (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input获取焦点
            if (!ev) return this.refs.input?.blur();
            else {
                //* 显示候选项
                this.methods.show();

                //* 触发focus回调
                emit("focus", ev);
            }
        };

        //? 清空事件
        const clear = () => {
            emit("update:modelValue", "");
            emit("clear");
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        };

        //? Input触发input事件
        const input = (ev: InputEvent | Event) => {
            //* 获取Target对象
            const target = ev.target as HTMLInputElement;

            //* 显示候选项窗口, 针对某些情况下提前隐藏候选项, 但触发input时候选项需要显示的场景
            this.methods.show();

            //* 触发v-model变更和input回调
            emit("update:modelValue", target.value);
            emit("input", ev as InputEvent);
        };

        //? Input触发回车事件
        const enter = (ev: KeyboardEvent | Event) => {
            emit("enter", ev);
        };

        //? Input触发change事件
        const change = (ev: Event) => {
            //* 触发change回调
            emit("change", ev);

            //* 触发表单change相关校验
            emitter?.emit(define.name || "", "change");
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

        return {
            cutCandidate,
            change,
            enter,
            input,
            focus,
            clear,
            blur,
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
}
