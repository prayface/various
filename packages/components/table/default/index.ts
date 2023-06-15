import { UiTypes } from "@various/constants";
import { ExtractPropTypes, PropType } from "vue";

export interface UiTableOption {
    "key": string;
    "name": string;
    "align"?: UiTypes.align;
    "className"?: string;

    //* 是否开启插槽, 接收一个插槽名称
    "slot"?: string;

    //* 是否开启排序功能
    "sort"?: boolean;

    //* 尺寸控制配置
    "width"?: number; //* 固定尺寸
    "min-width"?: number; //* 最小尺寸, 优先级低于width
    "max-width"?: number; //* 最大尺寸, 优先级低于width
}

export const UiTablePropsOption = {
    //* 表单数据源
    data: { type: Array as PropType<any[]>, required: true },
    //* 表单高度, 超出高度将出现滚动条
    height: { type: [String, Number] as PropType<string | number> },
    //* 表单左右两侧间距
    spacing: { type: Number, default: 40 },
    //* 表单加载配置
    loading: { type: Boolean, default: false },

    //* 是否开启单选功能
    ratio: { type: Boolean, default: false },
    //* 单选索引Key
    ratioIndex: { type: String },

    //* 是否开启嵌套表格功能
    children: { type: Boolean, default: false },
    //* 嵌套表格索引Key
    childrenIndex: { type: String },

    //* 表单配置项
    option: { type: Array as PropType<UiTableOption[]>, required: true },
} as const;

export type UiTableProps = ExtractPropTypes<typeof UiTablePropsOption>;

export const UiTableEmits = {
    sort: (key?: string, sort?: string) => true,
    ratio: (data: any) => true,
    checkbox: (data: any[]) => true,
};
