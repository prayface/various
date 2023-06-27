import { SetupContext, computed, inject } from "vue";
import { UiCheckboxProps, UiCheckboxEmits } from "../index";
import { UiCheckboxGroupInjectionKey } from "../../default-group";

export const useComposable = (define: UiCheckboxProps, emits: SetupContext<typeof UiCheckboxEmits>["emit"]) => {
    //* 父组件注入函数
    const checkboxGroup = inject(UiCheckboxGroupInjectionKey, undefined);

    //* 函数列表
    const methods = {
        switchData: (ev: Event) => {
            //* 获取节点
            const el = ev.target as HTMLInputElement;

            //* 响应时间操作
            emits("update:modelValue", el.checked || false);
            emits("change", ev);

            //* 响应父组件事件
            checkboxGroup && checkboxGroup.change(define.value);
        },
    };

    //* 计算函数
    const computeds = {
        //* 是否已被选中
        checked: computed(() => {
            if (checkboxGroup?.define.modelValue.includes(define.value)) return true;
            else return define.modelValue;
        }),

        //* 是否禁用
        disabled: computed(() => {
            if (define.disabled) return true;
            if (checkboxGroup) {
                //* 判断该多选框是否为已选中状态
                if (checkboxGroup.define.modelValue.includes(define.value)) {
                    //* 当已选中的数量达到最小数量时, 禁用已选中多选框取消
                    if (checkboxGroup.define.min && checkboxGroup.define.modelValue.length <= checkboxGroup.define.min) {
                        return true;
                    }
                } else {
                    //* 当已选中的数量达到最小数量时, 禁用未选中多选框选中
                    if (checkboxGroup.define.max && checkboxGroup.define.modelValue.length >= checkboxGroup.define.max) {
                        return true;
                    }
                }
            } else {
                return false;
            }
        }),

        //* 主体类名
        className: computed(() => {
            //* 1. 初始化返回值
            const result: string[] = [];

            //* 2. 检测是否被禁用
            if (computeds.disabled.value) result.push("ui-disabled-status");
            //* 3. 检测是否被激活
            if (computeds.checked.value) result.push("ui-active");

            return result.join(" ");
        }),
    };

    return { methods, computeds };
};
