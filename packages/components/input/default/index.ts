import { PropType, ExtractPropTypes } from "vue";
import { UiTypes } from "@various/constants";

export const UiInputPropsOption = {
    classExtraName: { type: String } /**候选项类名 */,
    autocomplete: { type: String, values: ["off", "on"], default: "off" },
    placeholder: { type: String, default: "Please input" } /**提示文本 */,
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    candidates: { type: Array as PropType<UiTypes.candidate[]>, default: [] } /**候选项 */,
    maxlength: { type: Number },
    animation: { type: Boolean, default: true }, //* 过渡动画是否开启
    clearable: { type: Boolean, default: false }, //* 输入框清空按钮是否显示
    disabled: { type: Boolean, default: false }, //* 输入框是否禁用
    readonly: { type: Boolean, default: false }, //* 输入框是否只读
    loading: { type: Boolean, default: false }, //* 输入框内置加载器是否开启
    height: { type: Number, default: 240 },
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    type: { type: String as PropType<"email" | "number" | "search" | "tel" | "text">, default: "text" }, //* 原生的文本框类型
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export type UiInputProps = ExtractPropTypes<typeof UiInputPropsOption>;

export const UiInputEmits = {
    "update:modelValue": (_value: any) => true,
    "select": (_ev: Event) => true,
    "change": (_ev: Event) => true,
    "enter": (_ev: KeyboardEvent | Event) => true,
    "input": (_ev: InputEvent | Event) => true,
    "focus": (_ev: FocusEvent | Event) => true,
    "clear": () => true,
    "blur": (_ev: FocusEvent | Event) => true,
};
