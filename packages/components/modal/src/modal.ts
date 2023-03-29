import { ExtractPropTypes, PropType } from "vue";

export const UiModalPropsOption = {
    title: { type: String },
    width: { type: [String, Number] as PropType<string | number>, default: 800 },
    height: { type: [String, Number] as PropType<string | number>, default: 600 },
    spacing: { type: String, default: "68px 112px" }, //? 内间距
    magnify: { type: Boolean, default: true }, //? 模态框是否允许被内容拉伸
    close: { type: Boolean, default: true }, //? 模态框是否显示关闭按钮
};

export type UiModalProps = ExtractPropTypes<typeof UiModalPropsOption>;

export const UiModalEmits = {
    open: () => true,
    close: () => true,
};
