import _ from "lodash";
import { computed } from "vue";
import { UiTextareaProps } from "./textarea";

export default (define: UiTextareaProps) => {
    return {
        //* 标签响应式属性
        attrs: computed(() => {
            // 初始化样式列表
            const style: { [name: string]: any } = {};
            // 数据返回
            if (define.height) style.height = define.height + "px";
            return {
                rows: define.rows,
                style: style,
                value: define.modelValue,
                disabled: define.disabled,
                readonly: define.readonly,
                placeholder: define.placeholder,
            };
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
