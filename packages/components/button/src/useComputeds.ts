import { UiButtonProps } from "./button";
import { computed } from "vue";

export default (define: UiButtonProps) => {
    return {
        //* 样式
        styles: computed(() => (define.width ? `min-width: ${define.width}px` : "")),
        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),
        //* 按钮类名
        className: computed(() => (define.size != "default" ? `ui-${define.size}` : "")),
        //* 按钮容器类名
        classNameContainer: computed(() => {
            if (define.loading) return `ui-button-loading ui-button-${define.mode}`;
            else if (define.disabled) return `ui-button-disabled ui-button-${define.mode}`;
            else return `ui-button-${define.mode}`;
        }),
    };
};
