import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiScopeInputPropsOption = {
    placeholder: { type: Object as PropType<{ start: string; end: string }> },
    modelValue: { type: Object as PropType<{ start: number; end: number }>, required: true },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    width: { type: [Number, String] as PropType<number | string>, default: 264 },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export const UiScopeInputEmits = {
    "update:modelValue": (_ev: any) => true,
    "change": (_ev?: Event) => true,
    "clear": (_ev?: any) => true,
    "input": (_ev?: InputEvent | Event) => true,
    "focus": (_ev?: FocusEvent | Event) => true,
    "blur": (_ev?: FocusEvent | Event) => true,
};

export type UiScopeInputProps = ExtractPropTypes<typeof UiScopeInputPropsOption>;
