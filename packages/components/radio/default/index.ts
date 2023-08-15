import { ExtractPropTypes } from "vue";

export const UiRadioPropsOption = {
    modelValue: { type: String, default: "" },
    value: { required: true },
} as const;

export const UiRadioEmits = {
    "change": (_ev: Event) => true,
    "update:modelValue": (_data: any) => true,
};

export type UiRadioProps = ExtractPropTypes<typeof UiRadioPropsOption>;
