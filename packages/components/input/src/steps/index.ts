import { PropType, ExtractPropTypes } from "vue";

export type UiStepsInputModelValue = {
    "end"?: number;
    "start"?: number;
    "end-steps": number;
    "start-steps": number;
};

export const UiStepsInputPropsOption = {
    placeholder: { type: Object as PropType<{ start: string; end: string }> } /**提示文本 */,
    modelValue: { type: Object as PropType<UiStepsInputModelValue>, required: true },
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    width: { type: Number, default: 408 },
    name: { type: String },
} as const;

export type UiStepsInputProps = ExtractPropTypes<typeof UiStepsInputPropsOption>;

export const UiStepsInputEmitsOption = ["change", "input", "focus", "blur"];
export type UiStepsInputEmits = {
    (event: "change", ev: Event): void;
    (event: "input", ev: InputEvent | Event): void;
    (event: "focus", ev: FocusEvent | Event): void;
    (event: "blur", ev: FocusEvent | Event): void;
};
