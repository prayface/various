import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiSelectPropsOption = {
    placeholder: { type: String, default: "Please select" } /**提示文本 */,
    modelValue: { type: String, required: true } /**选中项绑定值 */,
    candidate: { type: [Function, Array] as PropType<(...arg: any[]) => UiTypes.candidate[] | UiTypes.candidate[]>, required: true } /**候选项 */,
    clearable: { type: Boolean, default: false } /**是否可清空 */,
    disabled: { type: Boolean, default: false } /**是否禁用 */,
    readonly: { type: Boolean, default: false } /**是否只读 */,
    loading: { type: Boolean, default: false } /**是否启动内置loading */,
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export type UiSelectProps = ExtractPropTypes<typeof UiSelectPropsOption>;

export const UiSelectEmits = {
    "update:modelValue": (ev: any) => true,
    change: (ev?: Event) => true,
    clear: (ev?: any) => true,
};
