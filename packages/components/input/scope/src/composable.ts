import { SetupContext, computed, inject, ref } from "vue";

import { UiScopeInputProps, UiScopeInputEmits } from "../index";

import { utility } from "@various/utils";
import { UiFormEmitterKey } from "@various/constants";

export const useComposable = (define: UiScopeInputProps, emits: SetupContext<typeof UiScopeInputEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        active: ref<boolean>(false),
    };

    //* 组件状态
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

    //* 函数列表
    const methods = {
        //* 清空事件
        clear: () => {
            emits("update:modelValue", { start: "", end: "" });
            emits("clear", "clear");
            emitter?.emit(define.name || "", "change");
        },
    };

    //* 处理函数
    const handlers = {
        mainHandler: {
            change: (ev: Event) => {
                emits("change", ev);
                emitter?.emit(define.name || "", "change");
            },
            input: (ev: InputEvent | Event) => emits("input", ev as InputEvent),
            focus: (ev: FocusEvent | Event) => {
                refs.active.value = true;
                emits("focus", ev);
            },
            blur: (ev: FocusEvent | Event) => {
                refs.active.value = false;
                emits("blur", ev);
                emitter?.emit(define.name || "", "blur");
            },
        },
    };

    //* 计算属性
    const computeds = {
        //* 标签属性
        attrs: computed(() => {
            const isDisabled = ["disabled", "loading"].includes(status.value.name);
            const isReadonly = status.value.name == "readonly";
            return {
                start: { disabled: isDisabled, readonly: isReadonly, placeholder: define.placeholder?.start || "Start" },
                end: { disabled: isDisabled, readonly: isReadonly, placeholder: define.placeholder?.end || "End" },
            };
        }),

        //* 样式属性
        style: computed(() => {
            //* 宽度处理
            if (utility.isNumber(define.width)) return { width: define.width + "px" };
            else {
                return { width: define.width };
            }
        }),

        //* 标签类名
        className: computed(() => {
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
        }),
    };

    return { refs, status, methods, handlers, computeds };
};
