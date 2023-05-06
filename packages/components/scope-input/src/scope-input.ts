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
    "update:modelValue": (ev: any) => true,
    change: (ev?: Event) => true,
    clear: (ev?: any) => true,
    input: (ev?: InputEvent | Event) => true,
    focus: (ev?: FocusEvent | Event) => true,
    blur: (ev?: FocusEvent | Event) => true,
};

export type UiScopeInputProps = ExtractPropTypes<typeof UiScopeInputPropsOption>;
