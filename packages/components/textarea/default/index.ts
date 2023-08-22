import { ExtractPropTypes, PropType } from "vue";

export const UiTextareaPropsOption = {
    placeholder: { type: String, default: "Please input" }, //* 提示文本
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    maxlength: { type: Number },
    disabled: { type: Boolean, default: false }, //* 是否禁用
    readonly: { type: Boolean, default: false }, //* 是否只读
    loading: { type: Boolean, default: false }, //* 是否启动内置loading
    height: { type: [String, Number] as PropType<number | string> },
    width: { type: [String, Number] as PropType<number | string> },
    name: { type: String },
    rows: { type: Number, default: 3 },
} as const;

export type UiTextareaProps = ExtractPropTypes<typeof UiTextareaPropsOption>;

export const UiTextareaEmits = {
    "update:modelValue": (_data: any) => true,
    "change": (_ev: Event) => true,
    "clear": () => true,
    "input": (_ev: InputEvent | Event) => true,
    "click": (_ev: PointerEvent | Event) => true,
    "enter": (_ev: KeyboardEvent | Event) => true,
    "focus": (_ev?: FocusEvent | Event) => true,
    "blur": (_ev?: FocusEvent | Event) => true,
};
