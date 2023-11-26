import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiDatePickerPropsOption = {
    classExtraName: { type: String, default: "" }, //* 候选项容器类名
    placeholder: { type: String },
    modelValue: { type: String, required: true },
    animation: { type: Boolean, default: true }, //* 过渡动画是否开启
    disabled: { type: Function as PropType<(date: Date) => boolean> },
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    mode: { type: String as PropType<"date" | "month">, default: "date" },
    name: { type: String },
};

export type UiDatePickerProps = ExtractPropTypes<typeof UiDatePickerPropsOption>;

export const UiDatePickerEmits = {
    "update:modelValue": (_data: string) => true,
    "before-enter": () => true,
    "before-leave": () => true,
    "after-enter": () => true,
    "after-leave": () => true,
    "change": (_date: Date) => true,
    "clear": () => true,
};
