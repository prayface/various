import { PropType, ExtractPropTypes } from "vue";
import { UiTypes } from "@various/constants";

export const UiMessagePropsOption = {
    message: { type: String, required: true },
    type: { type: String as PropType<UiTypes.type>, default: "info" },
    icon: { type: String },
    delay: { type: Number, default: 3000 },
    offset: { type: Number, default: 20 },
} as const;

export type UiMessageProps = ExtractPropTypes<typeof UiMessagePropsOption>;
export type UiMessageOption = {
    message: string;
    offset?: number;
    delay?: number;
    icon?: string;
    type?: string;
};
