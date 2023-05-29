import { ExtractPropTypes, PropType } from "vue";

export const UiModalPropsOption = {
    close: { type: Boolean, default: true }, //? 模态框是否显示关闭按钮
    title: { type: String },
    width: { type: [String, Number] as PropType<string | number>, default: 800 },
    height: { type: [String, Number] as PropType<string | number>, default: 600 },
    zIndex: { type: Number, default: 666 }, //? 层叠优先级
    margin: { type: Number, default: 0 }, //? 外间距
    magnify: { type: Boolean, default: true }, //? 模态框是否允许被内容拉伸
    spacing: { type: String, default: "68px 112px" }, //? 内间距
    classExtraName: { type: String }, //? 模态框class名称,
};

export type UiModalProps = ExtractPropTypes<typeof UiModalPropsOption>;

export const UiModalEmits = {
    open: () => true,
    close: () => true,
};
