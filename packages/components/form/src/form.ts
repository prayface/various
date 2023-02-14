import { ExtractPropTypes, InjectionKey, PropType } from "vue";
import { Emitter } from "mitt";
import { UiTypes } from "@various/constants";

export type UiFormVerifyResult = boolean | { verify: boolean; message: string };

export interface UiFormRule {
    trigger?: "change" | "input" | "reminder";
    verify?: () => UiFormVerifyResult;
}

export const UiFormType = {
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    data: { type: Object as PropType<{ [name: string]: any }>, default: () => {} },
    rules: { type: Object as PropType<{ [name: string]: UiFormRule[] }>, default: () => {} },
} as const;

export const UiFormItemType = { prop: String, label: String, width: Number } as const;

export type UiFormProps = ExtractPropTypes<typeof UiFormType>;
export type UiFormItemProps = ExtractPropTypes<typeof UiFormItemType>;
export const UiFormEmitter: InjectionKey<Emitter<any>> = Symbol("UiFormEmitterKey");
