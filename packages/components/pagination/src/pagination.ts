import { ExtractPropTypes } from "vue";

export const UiPaginationPropsOption = {
    count: { type: Number, required: true }, //? 数据的总量
    items: { type: Boolean, default: true }, //? 是否显示统计信息
    limit: { type: Number, default: 10 }, //? 每页的数据量
    skip: { type: Number, default: 2 }, //? 点击...时分页切换的页码数
    modelValue: { type: Number, required: true }, //? 当前的页码
} as const;

export type UiPaginationProps = ExtractPropTypes<typeof UiPaginationPropsOption>;

export const UiPaginationEmits = {
    "update:modelValue": (key: number) => key,
    change: (key?: number) => key,
};
