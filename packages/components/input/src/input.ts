import { PropType, ExtractPropTypes } from "vue";
import { UiTypes } from "@various/constants";

export const UiInputType = {
    autocomplete: { type: String, values: ["off", "on"], default: "off" },
    placeholder: { type: String, default: "Please input" } /**提示文本 */,
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    candidate: { type: [Function, Array] as PropType<(...arg: any[]) => UiTypes.candidate[] | UiTypes.candidate[]> } /**候选项 */,
    clearable: { type: Boolean, default: false } /**是否可清空 */,
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    loading: { type: Boolean, default: false } /**是否启动内置loading */,
    width: { type: Number },
    type: { type: String as PropType<"email" | "number" | "search" | "tel" | "text">, default: "text" } /**文本框类型 */,
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export type UiInputProps = ExtractPropTypes<typeof UiInputType>;

export const UiInputEmits = {
    "update:modelValue": (ev: any) => ev,
    change: (ev?: Event) => ev,
    clear: (ev?: any) => ev,
    input: (ev?: InputEvent | Event) => ev,
    click: (ev?: PointerEvent | Event) => ev,
    focus: (ev?: FocusEvent | Event) => ev,
    blur: (ev?: FocusEvent | Event) => ev,
};
