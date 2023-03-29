import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiTextareaPropsOption = {
    placeholder: { type: String, default: "Please input" } /**提示文本 */,
    modelValue: { type: [String, Number] as PropType<string | number>, required: true },
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    loading: { type: Boolean, default: false } /**是否启动内置loading */,
    height: { type: Number },
    width: { type: Number },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
    rows: { type: Number, default: 3 },
} as const;

export type UiTextareaProps = ExtractPropTypes<typeof UiTextareaPropsOption>;

export const UiTextareaEmits = {
    "update:modelValue": (ev: any) => true,
    change: (ev?: Event) => true,
    clear: (ev?: any) => true,
    input: (ev?: InputEvent | Event) => true,
    click: (ev?: PointerEvent | Event) => true,
    focus: (ev?: FocusEvent | Event) => true,
    blur: (ev?: FocusEvent | Event) => true,
};
