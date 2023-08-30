import { ExtractPropTypes } from "vue";

export const UiTooltipFunctionPropsOption = {
    classExtraName: { type: String },
    content: { type: String }, //? 窗口内容, 可被slot#content替换
    offsetX: { type: Number, default: 20 },
    offsetY: { type: Number, default: 20 },
    zIndex: { type: Number, default: 66 },
    width: { type: Number }, //? 最大宽度
} as const;

export type UiTooltipFunctionProps = ExtractPropTypes<typeof UiTooltipFunctionPropsOption>;
