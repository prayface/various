import { UiButtonProps } from "./button";
import { computed } from "vue";

export default (define: UiButtonProps) => {
    return {
        //* 样式
        styles: computed(() => (define.width ? `min-width: ${define.width}px` : "")),
        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),
        //* 类名
        className: computed(() => {
            //* 1. 数据初始化
            const result: string[] = [];
            //* 2. 根据需求添加类名
            if (define.simple) result.push("ui-button-simple");
            if (define.size != "default") result.push(`ui-${define.size}`);
            if (define.type != "info") result.push(`ui-${define.type}-type`);
            if (define.loading) result.push("ui-loading-status");
            else if (define.disabled) result.push("ui-disabled-status");
            //* 3. 输出结果
            return result.join(" ");
        }),
    };
};
