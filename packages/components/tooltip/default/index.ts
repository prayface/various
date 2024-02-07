import type { ExtractPropTypes, PropType } from "vue";
import type { UiTypes } from "@various/constants";

export const UiTooltipPropsOption = {
    classExtraName: { type: String },
    direction: { type: String as PropType<UiTypes.direction>, default: "right" },
    trigger: { type: String as PropType<"hover" | "click" | "none">, default: "hover" },
    content: { type: String }, //? 窗口内容, 可被slot#content替换
    offset: { type: Number, default: 8 },
    zIndex: { type: Number, default: 66 },
    width: { type: Number }, //? 最大宽度
    align: { type: String as PropType<UiTypes.align>, default: "start" },
} as const;

export type UiTooltipProps = ExtractPropTypes<typeof UiTooltipPropsOption>;
export const UiTooltipEmits = {
    "before-enter": () => true,
    "before-leave": () => true,
    "after-enter": () => true,
    "after-leave": () => true,
};
