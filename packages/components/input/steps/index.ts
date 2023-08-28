import { PropType, ExtractPropTypes } from "vue";

export type UiStepsInputModelValue = {
    "end"?: number;
    "start"?: number;
    "end-steps"?: number;
    "start-steps"?: number;
};

export const UiStepsInputPropsOption = {
    placeholder: { type: Object as PropType<{ start?: string; end?: string }> } /**提示文本 */,
    modelValue: { type: Object as PropType<UiStepsInputModelValue>, required: true },
    width: { type: Number, default: 408 },
    name: { type: String },
} as const;

export type UiStepsInputProps = ExtractPropTypes<typeof UiStepsInputPropsOption>;

export const UiStepsInputEmits = {
    change: (_ev: Event) => true,
    input: (_ev: InputEvent | Event) => true,
    focus: (_ev: FocusEvent | Event) => true,
    blur: (_ev: FocusEvent | Event) => true,
};
