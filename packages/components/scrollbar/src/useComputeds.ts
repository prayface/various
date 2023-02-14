import { computed } from "vue";
import { UiScrollbarProps } from "./scrollbar";

export default (define: UiScrollbarProps) => {
    return {
        //* 主体样式
        styles: computed(() => {
            const result = {
                width: define.width ? `${define.width}px` : "100%",
                height: define.height ? `${define.height}px` : "100%",
                overflow: "hidden",
            };

            return result;
        }),
    };
};
