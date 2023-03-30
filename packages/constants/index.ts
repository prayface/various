import { Emitter } from "mitt";
import { InjectionKey, EmitsOptions } from "vue";
import { UnionToIntersection } from "@vue/shared";

export namespace UiTypes {
    export type size = "default" | "middle" | "large" | "small";
    export type type = "success" | "warning" | "info" | "error";
    export type align = "end" | "start" | "center";
    export type loading = boolean | { is: boolean; context?: string };
    export type direction = "top" | "left" | "right" | "bottom";
    export type candidate = { label: any; value: any };
    export type verifyResult = {
        type?: UiTypes.type;
        verify: boolean;
        message: string;
    };
    export type verifyRule = {
        trigger: "change" | "verify" | "blur";
        verify: (data: { [name: string]: any }) => verifyResult;
    };
}

// 表单触发器Key
export const UiFormEmitterKey: InjectionKey<Emitter<any>> = Symbol("UiFormEmitterKey");
// 表单数据Key
export const UiFormDataKey: InjectionKey<{ [name: string]: any }> = Symbol("UiFormDataKey");
// 表单校验规则Key
export const UiFormRulesKey: InjectionKey<{ [name: string]: UiTypes.verifyRule[] }> = Symbol("UiFormRulesKey");

// Emit获取器
export type UiEmitFn<Options = EmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V>
    ? (event: V, ...args: any[]) => void
    : {} extends Options
    ? (event: string, ...args: any[]) => void
    : UnionToIntersection<
          {
              [key in Event]: Options[key] extends (...args: infer Args) => any
                  ? (event: key, ...args: Args) => void
                  : (event: key, ...args: any[]) => void;
          }[Event]
      >;
