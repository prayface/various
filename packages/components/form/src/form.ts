import { ExtractPropTypes, PropType } from "vue";
import { InjectionKey } from "vue";
import { UiTypes } from "@various/constants";

export type UiFormVerifyResult = { verify: boolean; message?: string; type?: UiTypes.type };

export interface UiFormRule {
    trigger: "change" | "input" | "reminder";
    verify: (data: { [name: string]: any }) => UiFormVerifyResult;
}

export const UiFormType = {
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    data: {
        type: Object as PropType<{ [name: string]: any }>,
        default: () => {},
    },
    rules: {
        type: Object as PropType<{ [name: string]: UiFormRule[] }>,
        default: () => {},
    },
} as const;

export const UiFormItemType = {
    prop: String,
    label: String,
    width: Number,
    direction: { type: String as PropType<"row" | "column">, default: "row" },
} as const;

export type UiFormProps = ExtractPropTypes<typeof UiFormType>;
export type UiFormItemProps = ExtractPropTypes<typeof UiFormItemType>;
export const UiFormRulesKey: InjectionKey<{ [name: string]: UiFormRule[] }> = Symbol("UiFormRulesKey");
