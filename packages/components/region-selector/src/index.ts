import { ExtractPropTypes, PropType } from "vue";

export const UiRegionSelectorPropsOption = {
    classExtraName: { type: String } /**候选项类名 */,
    modelValue: { type: Array as PropType<string[]>, required: true } /**选中项绑定值 */,
    disabled: { type: Boolean, default: false }, //* 选择器是否禁用
    readonly: { type: Boolean, default: false }, //* 选择器是否只读
    loading: { type: Boolean, default: false }, //* 选择器内置加载器是否开启
    height: { type: Number, default: 240 },
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    name: { type: String },
} as const;

export type UiRegionSelectorProps = ExtractPropTypes<typeof UiRegionSelectorPropsOption>;

export const UiRegionSelectorEmits = {
    "update:modelValue": (_ev: any) => true,
    "before-enter": () => true,
    "before-leave": () => true,
    "after-enter": () => true,
    "after-leave": () => true,
    "change": (_ev?: Event) => true,
};

export interface UiRegionSelectorOption {
    name: string;
    children?: UiRegionSelectorOption[];
}
