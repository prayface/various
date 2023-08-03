import { PropType, ExtractPropTypes } from "vue";
import { UiTypes } from "@various/constants";

export const UiInputPropsOption = {
    classExtraName: { type: String } /**候选项类名 */,
    autocomplete: { type: String, values: ["off", "on"], default: "off" },
    placeholder: { type: String, default: "Please input" } /**提示文本 */,
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    candidates: { type: Array as PropType<UiTypes.candidate[]> } /**候选项 */,
    maxlength: { type: Number },
    clearable: { type: Boolean, default: false } /**是否可清空 */,
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    loading: { type: Boolean, default: false } /**是否启动内置loading */,
    height: { type: Number, default: 240 },
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    type: { type: String as PropType<"email" | "number" | "search" | "tel" | "text">, default: "text" } /**文本框类型 */,
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
    max: { type: Number },
    min: { type: Number },
} as const;

export type UiInputProps = ExtractPropTypes<typeof UiInputPropsOption>;

export const UiInputEmitsOption = ["update:modelValue", "select", "change", "clear", "enter", "input", "focus", "blur"];
export type UiInputEmits = {
    (event: "update:modelValue", value: any): void;
    (event: "clear"): void;
    (event: "select", ev: Event): void;
    (event: "change", ev: Event): void;
    (event: "enter", ev: KeyboardEvent | Event): void;
    (event: "input", ev: InputEvent | Event): void;
    (event: "focus", ev: FocusEvent | Event): void;
    (event: "blur", ev: FocusEvent | Event): void;
};
