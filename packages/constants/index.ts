import { Emitter } from "mitt";
import { InjectionKey } from "vue";

export namespace UiTypes {
    export type size = "default" | "middle" | "large" | "small";
    export type type = "success" | "warning" | "info" | "error";
    export type align = "top" | "center" | "bottom";
    export type direction = "top" | "left" | "right" | "bottom";
    export type candidate = { label: any; value: any };
}

// 表单触发器Key
export const UiFormEmitterKey: InjectionKey<Emitter<any>> = Symbol("UiFormEmitterKey");
// 表单数据Key
export const UiFormDataKey: InjectionKey<{ [name: string]: any }> = Symbol("UiFormDataKey");
