import { Emitter } from "mitt";
import { InjectionKey, App, ComponentPublicInstance } from "vue";

//* 类型
export namespace UiTypes {
    export type size = "default" | "middle" | "large" | "small";
    export type type = "success" | "warning" | "info" | "error";
    export type align = "end" | "start" | "center";
    export type loading = boolean | { is: boolean; context?: string };
    export type direction = "top" | "left" | "right" | "bottom";
    export type candidate = { label: any; value: any; [name: string]: any };
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

export interface UiHTMLElement extends HTMLElement {
    app?: App<Element>;
    instance?: ComponentPublicInstance;
}

//* 表单触发器Key
export const UiFormEmitterKey: InjectionKey<Emitter<any>> = Symbol("UiFormEmitterKey");
//* 表单数据Key
export const UiFormDataKey: InjectionKey<{ [name: string]: any }> = Symbol("UiFormDataKey");
//* 表单校验规则Key
export const UiFormRulesKey: InjectionKey<{ [name: string]: UiTypes.verifyRule[] }> = Symbol("UiFormRulesKey");

export * from "./components";
