import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiButtonPropsOption = {
    nativeType: { type: String as PropType<"button" | "submit" | "reset">, default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    width: { type: Number },
    type: { type: String as PropType<UiTypes.type>, default: "info" },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
} as const;

export type UiButtonProps = ExtractPropTypes<typeof UiButtonPropsOption>;

export const UiButtonEmits = {
    click: (ev?: MouseEvent | Event) => ev,
};
