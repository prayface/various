import { ExtractPropTypes, PropType } from "vue";

export const UiModalSemiScreenPropsOption = {
    close: { type: Boolean, default: true }, //? 模态框是否显示关闭按钮
    title: { type: String },
    width: { type: [String, Number] as PropType<string | number>, default: 800 },
    zIndex: { type: Number, default: 666 }, //? 层叠优先级
    margin: { type: Number, default: 0 }, //? 外间距
    spacing: { type: String, default: "68px 112px" }, //? 内间距
    classExtraName: { type: String }, //? 模态框class名称,
};

export type UiModalSemiScreenProps = ExtractPropTypes<typeof UiModalSemiScreenPropsOption>;

export const UiModalSemiScreenEmits = {
    open: () => true,
    close: () => true,
};
