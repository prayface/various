import { ExtractPropTypes, InjectionKey } from "vue";

export const UiRadioGroupPropsOption = {
    modelValue: { type: String, required: true },
    name: { type: String },
} as const;

export const UiRadioGroupEmits = {
    "update:modelValue": (value: any) => true,
    "change": () => true,
};

export type UiRadioGroupProps = ExtractPropTypes<typeof UiRadioGroupPropsOption>;
export type UiRadioGroupInjectionKeyType = InjectionKey<{ define: UiRadioGroupProps; change: (...args: any) => void }>;
export const UiRadioGroupInjectionKey: UiRadioGroupInjectionKeyType = Symbol("UiRadioGroupInjectionKey");
