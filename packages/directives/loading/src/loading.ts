import { ExtractPropTypes } from "vue";

export const LoadingType = {
    className: { type: String, default: "" },
    content: { type: String, default: "加载中..." },
    height: { type: Number },
    width: { type: Number },
    show: { type: Boolean, default: false },
    icon: { type: String, default: "loading" },
} as const;

export type LoadingProps = ExtractPropTypes<typeof LoadingType>;
