import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiButtonType = {
    nativeType: { type: String as PropType<"button" | "submit" | "reset">, default: "submit" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    width: { type: Number },
    type: { type: String as PropType<UiTypes.type>, default: "info" },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    icon: { type: String },
} as const;

export type UiButtonProps = ExtractPropTypes<typeof UiButtonType>;
export const UiButtonEmits = {
    click: (ev: MouseEvent | Event) => ev,
};
