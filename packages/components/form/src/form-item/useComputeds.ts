import { computed, Ref } from "vue";
import { UiFormItemProps } from "../form";

export default (define: UiFormItemProps, status: Ref<string>) => {
    return {
        className: computed(() => {
            if (status.value != "info") {
                return `ui-form-${define.direction} ui-${status.value}-type`;
            } else {
                return `ui-form-${define.direction}`;
            }
        }),

        styles: computed(() => {
            if (define.width) return { width: define.width + "px" };
            else return {};
        }),
    };
};
