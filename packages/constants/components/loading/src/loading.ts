import { ExtractPropTypes, PropType } from "vue";

export const UiLoadingPropsOption = {
    message: { type: String, default: "加载中" },
    visible: { type: Boolean, default: false },
    zIndex: { type: Number },
    mode: { type: String as PropType<"absolute" | "fixed">, default: "absolute" },
    icon: { type: String, default: "loading" },
} as const;

export type UiLoadingProps = ExtractPropTypes<typeof UiLoadingPropsOption>;
