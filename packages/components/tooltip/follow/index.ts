import { ExtractPropTypes } from "vue";

export const UiTooltipFollowPropsOption = {
    classExtraName: { type: String },
    disabled: { type: Boolean, default: false },
    content: { type: String }, //? 窗口内容, 可被slot#content替换
    offsetX: { typs: Number, default: 20 },
    offsetY: { typs: Number, default: 20 },
    zIndex: { type: Number, default: 66 },
    width: { type: Number }, //? 最大宽度
} as const;

export type UiTooltipFollowProps = ExtractPropTypes<typeof UiTooltipFollowPropsOption>;
