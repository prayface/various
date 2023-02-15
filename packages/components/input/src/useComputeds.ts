import { computed } from "vue";
import { isArray, isFunction } from "lodash";
import { UiInputProps } from "./input";

export default (define: UiInputProps) => {
    return {
        //* 标签响应式属性
        attrs: computed(() => {
            return {
                type: define.type,
                value: define.modelValue,
                disabled: define.disabled,
                readonly: define.readonly,
                placeholder: define.placeholder,
                autocomplete: define.autocomplete,
            };
        }),

        //* 候选项
        candidates: computed(() => {
            if (isArray(define.candidate)) return define.candidate;
            else if (isFunction(define.candidate)) {
                const result = define.candidate();
                if (isArray(result)) {
                    return result;
                }
            }

            return [];
        }),

        //* 类名
        className: computed(() => {
            // 初始化输出
            const result: string[] = [];
            // 判断是否是禁用或只读状态
            if (define.disabled) result.push("ui-disabled-status");
            else if (define.readonly) result.push("ui-readonly-status");
            // 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);
            // 判断是否需要添加clearable类名
            if (define.clearable) result.push("ui-clearable");

            return result.join(" ");
        }),

        //* 样式
        styles: computed(() => {
            if (define.width) return { width: define.width + "px" };
            else return {};
        }),
    };
};
