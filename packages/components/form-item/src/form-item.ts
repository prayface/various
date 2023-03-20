import { ExtractPropTypes, PropType } from "vue";

export const UiFormItemPropsOption = {
    prop: { type: String },
    label: { type: String },
    width: { type: Number },
    direction: { type: String as PropType<"row" | "column">, default: "row" },
} as const;

export type UiFormItemProps = ExtractPropTypes<typeof UiFormItemPropsOption>;
