import { PropType, ExtractPropTypes } from "vue";
import { UiTypes } from "@various/constants";

export const UiInputPropsOption = {
    classExtraName: { type: String } /**候选项类名 */,
    autocomplete: { type: String, values: ["off", "on"], default: "off" },
    placeholder: { type: String, default: "Please input" } /**提示文本 */,
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    candidates: { type: Array as PropType<UiTypes.candidate[]> } /**候选项 */,
    clearable: { type: Boolean, default: false } /**是否可清空 */,
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    loading: { type: Boolean, default: false } /**是否启动内置loading */,
    width: { type: Number },
    type: { type: String as PropType<"email" | "number" | "search" | "tel" | "text">, default: "text" } /**文本框类型 */,
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export type UiInputProps = ExtractPropTypes<typeof UiInputPropsOption>;

export const UiInputEmits = {
    "update:modelValue": (ev: any) => true,
    "change": (ev?: Event) => true,
    "select": (ev?: Event) => true,
    "clear": (ev?: any) => true,
    "input": (ev?: InputEvent | Event) => true,
    "focus": (ev?: FocusEvent | Event) => true,
    "click": (ev?: PointerEvent | Event) => true,
    "enter": (done: () => void) => true,
    "blur": (ev?: FocusEvent | Event) => true,
};
