import { UiTypes } from "@various/constants";
import { ExtractPropTypes, PropType } from "vue";

export interface UiTableMergeOption {
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

    "row"?: number;
    "col"?: number;
    "children"?: UiTableMergeOption[];
}

export const UiTableMergePropsOption = {
    //* 表单数据源
    data: { type: Array as PropType<any[]>, required: true },

    //* 表单边框样式
    border: { type: Number, default: 0 },
    borderColor: { type: String, default: "#ffffff" },

    //* 表单高度, 超出高度将出现滚动条
    height: { type: [String, Number] as PropType<string | number> },
    //* 表单左右两侧间距
    spacing: { type: Number, default: 40 },
    //* 无数据处理
    noData: { type: String, default: "" },

    //* 表单配置项
    option: { type: Array as PropType<UiTableMergeOption[]>, required: true },
} as const;

export type UiTableMergeProps = ExtractPropTypes<typeof UiTableMergePropsOption>;

export const UiTableMergeEmits = {
    sort: (_key: string, _sort: string) => true,
    merge: (_object: object, _callback: any) => true,
    rowClass: (_object: object, _callback: any) => true,
};

