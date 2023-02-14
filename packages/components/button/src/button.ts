import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiButtonType = {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    width: Number,
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    type: { type: String as PropType<"button" | "submit" | "reset">, default: "submit" },
    mode: { type: String as PropType<"pierced" | "entity">, default: "entity" },
    icon: String,
} as const;

export type UiButtonProps = ExtractPropTypes<typeof UiButtonType>;
export const UiButtonEmits = {
    click: (ev: MouseEvent | Event) => ev,
};
