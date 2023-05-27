import { ExtractPropTypes, PropType } from "vue";

export const UiAsideModalPropsOption = {
    close: { type: Boolean, default: true }, //? 模态框是否显示关闭按钮
    width: { type: [String, Number] as PropType<string | number>, default: 800 },
    spacing: { type: String, default: "56px 48px" }, //? 内间距
    classExtraName: { type: String }, //? 模态框class名称,
};

export type UiAsideModalProps = ExtractPropTypes<typeof UiAsideModalPropsOption>;

export const UiAsideModalEmits = {
    open: () => true,
    close: () => true,
};
