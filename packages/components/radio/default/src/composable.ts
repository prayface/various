import { SetupContext, computed, inject } from "vue";
import { UiRadioGroupInjectionKey } from "../../default-group/index";
import { UiRadioEmits, UiRadioProps } from "../index";

export const useComposable = (define: UiRadioProps, emits: SetupContext<typeof UiRadioEmits>["emit"]) => {
    //* 获取父组件注入函数
    const radioGroup = inject(UiRadioGroupInjectionKey, undefined);

    //* 计算属性
    const computeds = {
        //* 选择状态
        checked: computed(() => {
            if (radioGroup?.define.modelValue == define.value) return true;
            else {
                return define.modelValue == define.value;
            }
        }),

        //* 标签类名
        className: computed(() => {
            //* 1. 初始化返回值
            const result: string[] = [];
            //* 2. 检测是否被激活
            if (computeds.checked.value) result.push("ui-active");

            return result.join(" ");
        }),
    };

    //* 函数列表
    const methods = {
        switchRatio: (_ev: Event) => {
            //* 1. 获取Input节点
            const el = _ev.target as HTMLInputElement;

            //* 2. 响应事件操作
            emits("update:modelValue", el.value || "");
            emits("change", _ev);

            //* 3. 响应父组件事件
            radioGroup?.change(define.value);
        },
    };

    return { computeds, methods };
};
