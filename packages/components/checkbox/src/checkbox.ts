import { UiTypes } from "@various/constants";
import { ExtractPropTypes, PropType } from "vue";

export const UiCheckboxPropsOption = {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { required: true },
    mode: { type: String as PropType<"default">, default: "default" },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
} as const;

export const UiCheckboxEmits = {
    change: (ev: Event) => true,
    "update:modelValue": (data: boolean) => true,
};

export type UiCheckboxProps = ExtractPropTypes<typeof UiCheckboxPropsOption>;
