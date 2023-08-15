import { SetupContext, computed, inject, ref } from "vue";
import { UiStepsInputProps, UiStepsInputEmits } from "../index";
import { UiFormEmitterKey } from "@various/constants";

export const useComposable = (define: UiStepsInputProps, emit: SetupContext<typeof UiStepsInputEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式属性
    const refs = {
        currentPage: ref<string>(""),
    };

    //* 函数列表
    const methods = {
        //* Input失去焦点事件
        blur: (ev: FocusEvent | Event) => {
            //* 触发blur回调
            emit("blur", ev);

            //* 触发表单blur相关校验
            emitter?.emit(define.name || "", "blur");

            //* 失焦重置当前模块
            refs.currentPage.value = "";
        },

        //* Input获取焦点事件
        focus: (ev: FocusEvent | Event) => {
            //* 触发focus回调
            emit("focus", ev);
        },

        //* Input触发input事件
        input: (ev: InputEvent) => {
            //* 触发v-model变更和input回调
            emit("input", ev);
        },

        //* Input触发change事件
        change: (ev: Event) => {
            const isMainValue = !define.modelValue.start?.toString() || !define.modelValue.end?.toString();
            const isStepsValue = !define.modelValue["end-steps"].toString() || !define.modelValue["start-steps"].toString();
            //* 当输入完整时, 触发change回调
            if (isMainValue || isStepsValue) return;
            else {
                //* 触发change回调
                emit("change", ev);

                //* 触发表单change相关校验
                emitter?.emit(define.name || "", "change");
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* start动态属性
        startAttrs: computed(() => {
            return {
                placeholder: define.placeholder?.start || "",
            };
        }),

        //* start响应事件
        startOns: computed(() => {
            return {
                blur: methods.blur,
                input: methods.input,
                change: methods.change,
                focus: (ev: FocusEvent | Event) => {
                    refs.currentPage.value = "start";
                    methods.focus(ev);
                },
            };
        }),

        //* end动态属性
        endAttrs: computed(() => {
            return {
                placeholder: define.placeholder?.end || "",
            };
        }),

        //* end响应事件
        endOns: computed(() => {
            return {
                blur: methods.blur,
                input: methods.input,
                change: methods.change,
                focus: (ev: FocusEvent | Event) => {
                    refs.currentPage.value = "end";
                    methods.focus(ev);
                },
            };
        }),

        //* 样式列表
        style: computed(() => {
            return {
                width: (define.width - 40) / 2 + "px",
            };
        }),
    };

    return {
        refs,
        methods,
        computeds,
    };
};
