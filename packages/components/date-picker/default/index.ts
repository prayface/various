import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiDatePickerPropsOption = {
    classExtraName: { type: String, default: "" } /**候选项类名 */,
    placeholder: { type: String, default: "" } /**提示文本 */,
    modelValue: { type: String, required: true } /**选中项绑定值 */,
    zIndex: { type: Number, default: 66 },
    width: { type: [String, Number] as PropType<number | string>, default: 264 },
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    mode: { type: String as PropType<"date" | "month">, default: "date" },
    name: { type: String },
};

export type UiDatePickerProps = ExtractPropTypes<typeof UiDatePickerPropsOption>;

export const UiDatePickerEmits = {
    "update:modelValue": (_data: string) => true,
    "clear": () => true,
};
