import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiTooltipPropsOption = {
    direction: { type: String as PropType<UiTypes.direction>, default: "right" },
    disabled: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
    offsetX: { type: Number },
    offsetY: { type: Number },
    trigger: { type: String as PropType<"click" | "hover">, default: "hover" },
    content: { type: String }, //? 窗口内容, 可被slot#content替换
    effect: { type: String }, //? Tooltip主题
    width: { type: Number, default: 200 }, //? 最大宽度
    align: { type: String as PropType<UiTypes.align>, default: "top" },
    mode: { type: String as PropType<"fixed" | "follow">, default: "fixed" },
} as const;

export type UiTooltipProps = ExtractPropTypes<typeof UiTooltipPropsOption>;
