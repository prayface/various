import type { ExtractPropTypes, PropType } from "vue";

export interface UiCascadeOption {
    name: string;
    value: any;
    children: { name: string; value: any }[];
}

export const UiCascadePropsOption = {
    classExtraName: { type: String }, //* 候选项容器类名
    resolveName: { type: Function as PropType<() => string> }, //* 名称解析函数
    placeholder: { type: String }, //* 提示文本
    modelValue: { type: Array as PropType<any[]>, required: true },
    disabled: { type: Boolean, default: false }, //* 选择器是否禁用
    readonly: { type: Boolean, default: false }, //* 选择器是否只读
    loading: { type: Boolean, default: false }, //* 选择器内置加载器是否开启
    height: { type: Number, default: 240 },
    zIndex: { type: Number, default: 66 },
    option: { type: Array as PropType<UiCascadeOption[]>, required: true }, //* 配置
    width: { type: [String, Number] as PropType<number | string> },
    sort: { type: Function as PropType<(option: UiCascadeOption) => { name: string; value: any }[]> }, //* 次级候选项排序函数
    name: { type: String },
} as const;

export type UiCascadeProps = ExtractPropTypes<typeof UiCascadePropsOption>;

export const UiCascadeEmits = {
    "update:modelValue": (_ev: any) => true,
    "before-enter": () => true,
    "before-leave": () => true,
    "after-enter": () => true,
    "after-leave": () => true,
    "change": (_ev?: Event) => true,
};
