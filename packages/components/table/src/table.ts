import { ExtractPropTypes, PropType } from "vue";

export interface UiTableOption {
    key: string;
    name: string;
    flex?: number;
    slot?: string;
    sort?: boolean;
    width?: number;
    children?: boolean;
    className?: string;
}

export const UiTablePropsOption = {
    data: { type: Array as PropType<any[]>, required: true },
    ratio: { type: String },
    height: { type: [String, Number] as PropType<string | number> },
    option: { type: Array as PropType<UiTableOption[]>, required: true },
    spacing: { type: Number, default: 56 },
    loading: { type: Boolean, default: false },
    checkbox: { type: Boolean, default: false },
} as const;

export type UiTableProps = ExtractPropTypes<typeof UiTablePropsOption>;
export const UiTableEmits = {
    sort: (key: string, sort: "" | "asc" | "desc") => true,
    ratio: (data: any) => true,
    checkbox: (data: any[]) => true,
};
