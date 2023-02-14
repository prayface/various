import { UiTooltipProps } from "./tooltip";
import { computed } from "vue";

export default (define: UiTooltipProps) => {
    return {
        // 类名
        className: computed(() => {
            return define.effect ? `ui-effect-${define.effect}` : "";
        }),
        // 样式
        styles: computed(() => {
            return {
                "max-width": define.width + "px",
            };
        }),
    };
};
