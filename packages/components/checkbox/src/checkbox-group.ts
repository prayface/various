import { ExtractPropTypes, InjectionKey } from "vue";

export const UiCheckboxGroupPropsOption = {
    modelValue: { type: Array, required: true },
    name: { type: String },
    max: { type: Number },
    min: { type: Number },
} as const;

export const UiCheckboxGroupEmits = {
    change: () => true,
};

export type UiCheckboxGroupProps = ExtractPropTypes<typeof UiCheckboxGroupPropsOption>;
export type UiCheckboxGroupInjectionKeyType = InjectionKey<{ define: UiCheckboxGroupProps; values: any[]; change: (...args: any) => void }>;
export const UiCheckboxGroupInjectionKey: UiCheckboxGroupInjectionKeyType = Symbol("UiCheckboxGroupInjectionKey");
