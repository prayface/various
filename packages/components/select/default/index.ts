import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiSelectPropsOption = {
    classExtraName: { type: String } /**候选项类名 */,
    placeholder: { type: String, default: "Please select" } /**提示文本 */,
    modelValue: { type: String, required: true } /**选中项绑定值 */,
    candidates: { type: Array as PropType<UiTypes.candidate[]>, required: true } /**候选项 */,
    clearable: { type: Boolean, default: false }, //* 清空按钮是否显示
    animation: { type: Boolean, default: true }, //* 过渡动画是否开启
    disabled: { type: Boolean, default: false }, //* 选择器是否禁用
    readonly: { type: Boolean, default: false }, //* 选择器是否只读
    loading: { type: Boolean, default: false }, //* 选择器内置加载器是否开启
    height: { type: Number, default: 240 },
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    name: { type: String },
} as const;

export type UiSelectProps = ExtractPropTypes<typeof UiSelectPropsOption>;

export const UiSelectEmits = {
    "update:modelValue": (_ev: any) => true,
    "before-enter": () => true,
    "before-leave": () => true,
    "after-enter": () => true,
    "after-leave": () => true,
    "change": (_ev?: Event) => true,
    "clear": (_ev?: any) => true,
};
