import { UiTypes } from "@various/constants";
import { ExtractPropTypes, PropType } from "vue";

export interface UiTableOption {
    "key": string;
    "name": string;
    "align": UiTypes.align;
    "className"?: string;
    "children"?: boolean;

    //* 是否开启插槽, 接收一个插槽名称
    "slot"?: string;

    //* 是否开启排序功能
    "sort"?: boolean;

    //* 尺寸控制配置
    "width"?: number; //* 固定尺寸
    "replenish"?: number; //* 补足时的份额, 若没有则为平均分配
    "min-width"?: number; //* 最小尺寸, 优先级低于width
    "max-width"?: number; //* 最大尺寸, 优先级低于width
}

export const UiTablePropsOption = {
    data: { type: Array as PropType<any[]>, required: true },
    ratio: { type: String },
    height: { type: [String, Number] as PropType<string | number> },
    option: { type: Array as PropType<UiTableOption[]>, required: true },
    spacing: { type: Number, default: 40 },
    loading: { type: Boolean, default: false },
    checkbox: { type: Boolean, default: false },
} as const;

export type UiTableProps = ExtractPropTypes<typeof UiTablePropsOption>;
export const UiTableEmits = {
    sort: (key: string, sort: string) => true,
    ratio: (data: any) => true,
    checkbox: (data: any[]) => true,
};
