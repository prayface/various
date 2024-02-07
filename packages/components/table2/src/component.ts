//* Vue
import { ExtractPropTypes, PropType } from "vue";

//* 表格配置单项
export interface UiTableOption2 {
    "key": string;
    "name": string;
    "slot"?: string; //* 重命名插槽，默认为key
    "sort"?: boolean; //* 排序功能
    "align"?: "left" | "right" | "center" | "singularity"; //* 对齐方式
    "width"?: number; //* 固定尺寸
    "extra"?: boolean; //* 窗口功能
    "explain"?: any; //* 解释内容
    "min-width"?: number; //* 最小尺寸, 优先级低于width
    "max-width"?: number; //* 最大尺寸, 优先级低于width
    "className"?: string; //* className
    "extra-icon"?: string; //* 窗口图标
    "extra-name"?: string; //* 窗口className
    "explain-icon"?: string; //* 解释内容图标
    "explain-name"?: string; //* 解释内容窗口className
}

//* 表格配置项
export const UiTablePropsOption2 = {
    //* 表格数据源
    data: { type: Array as PropType<any[]>, required: true },
    //* 无数据时的提示文本
    error: { type: String, default: "" },
    //* 表格高度, 超出高度将出现滚动条
    height: { type: [String, Number] as PropType<string | number> },
    //* 表格配置项
    option: { type: Array as PropType<UiTableOption2[]>, required: true },
    //* 表格两侧间距
    spacing: { type: [String, Number] as PropType<string | number>, default: 0 },
    //* 表格选择功能
    selector: { type: String as PropType<"radio" | "checkbox" | "children"> },
    //* 表格宽度溢出
    overflow: { type: Boolean, default: false },
} as const;

//* 表格配置项类型
export type UiTableProps2 = ExtractPropTypes<typeof UiTablePropsOption2>;
//* 表格响应事件
export const UiTableEmits2 = {
    sort: (_result: { key: string; value: string }) => true, //* 排序
    radio: (_data: any) => true, //* 单选
    checkbox: (_data: any[]) => true, //* 复选
};
