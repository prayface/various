import { ExtractPropTypes } from "vue";

export const UiLoadingPropsOption = {
    className: { type: String, default: "" },
    content: { type: String, default: "加载中..." },
    zIndex: { type: Number },
    show: { type: Boolean, default: false },
    icon: { type: String, default: "loading" },
} as const;

export type UiLoadingProps = ExtractPropTypes<typeof UiLoadingPropsOption>;
