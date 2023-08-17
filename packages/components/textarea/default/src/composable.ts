import { SetupContext, computed, inject, ref } from "vue";
import { UiTextareaProps, UiTextareaEmits } from "../index";
import { UiFormEmitterKey } from "@various/constants";
import { utility } from "@various/utils";

export const useComposable = (define: UiTextareaProps, emits: SetupContext<typeof UiTextareaEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式属性
    const refs = {
        inputNode: ref<HTMLInputElement>(), //* 输入框节点
    };

    //* 函数列表
    const methods = {
        //* 回车函数
        enter: (ev: KeyboardEvent) => emits("enter", ev),

        //* 清空函数
        clear: () => {
            emits("update:modelValue", ""); //* 清空文本框内容
            emits("clear"); //* 触发清空回调
            emitter?.emit(define.name || "", "change"); //* 促发表单change回调
        },

        //* 焦点获取函数
        focus: (ev?: FocusEvent | Event) => {
            emits("focus", ev);
            emitter?.emit(define.name || "", "focus");
            if (!ev) {
                refs.inputNode.value?.focus();
            }
        },

        //* 焦点失去函数
        blur: (ev?: FocusEvent | Event) => {
            emits("blur", ev);
            emitter?.emit(define.name || "", "blur");
            if (!ev) {
                refs.inputNode.value?.blur();
            }
        },
    };

    //* 处理函数列表
    const handlers = {
        inputHandler: {
            blur: methods.blur,
            focus: methods.focus,
            click: (ev: PointerEvent | Event) => emits("click", ev),
            change: (ev: Event) => {
                emits("change", ev);
                emitter?.emit(define.name || "", "change");
            },
            input: (ev: InputEvent) => {
                emits("update:modelValue", (ev.target as HTMLInputElement).value);
                emits("input", ev);
            },
        },
    };

    //* 计算属性
    const computeds = {
        //* 文本框属性
        attrs: computed(() => {
            const result: any = {
                rows: define.rows,
                value: define.modelValue,
                disabled: define.disabled,
                readonly: define.readonly,
                placeholder: define.placeholder,
            };

            if (define.maxlength) result.maxlength = define.maxlength;

            return result;
        }),

        //* 文本框样式
        style: computed(() => {
            //* 初始化数据
            const result: { [name: string]: string } = {};

            //* 宽度设置
            if (define.width) {
                if (utility.isNumber(define.width)) result.width = define.width + "px";
                else {
                    result.width = define.width as string;
                }
            }

            //* 高度设置
            if (define.height) {
                if (utility.isNumber(define.height)) result.height = define.height + "px";
                else {
                    result.height = define.height as string;
                }
            }

            return result;
        }),

        //* 文本框状态
        status: computed(() => {
            if (define.loading) {
                return { is: true, name: "loading" };
            } else {
                return { is: false, name: define.disabled ? "disabled" : define.readonly ? "readonly" : "default" };
            }
        }),

        //* 文本框类名
        className: computed(() => {
            //* 初始化输出
            const result: string[] = [];
            //* 判断是否是禁用或只读状态
            if (computeds.status.value.name == "disabled") result.push("ui-disabled-status");
            else if (computeds.status.value.name == "readonly") result.push("ui-readonly-status");
            else if (computeds.status.value.name == "loading") result.push("ui-loading-status");
            //* 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);

            return result.join(" ");
        }),
    };

    return { refs, methods, handlers, computeds };
};
