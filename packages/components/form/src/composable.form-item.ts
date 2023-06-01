import { computed } from "vue";
import { UiTypes } from "@various/constants";
import { UiFormItemProps } from "./form-item";

export type UiFormItemConstructorRefs = {
    timer?: NodeJS.Timer;
    status: UiTypes.type;
    content: string;
    visible: boolean;
};

export type UiFormItemConstructorOption = {
    rules: { [name: string]: UiTypes.verifyRule[] };
    data: { [name: string]: any };
};

export default class {
    refs: UiFormItemConstructorRefs;
    methods;
    computeds;

    constructor(refs: UiFormItemConstructorRefs, define: UiFormItemProps, option: UiFormItemConstructorOption) {
        this.refs = refs;
        this.methods = this.#useMethods(define, option.rules, option.data);
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiFormItemProps) {
        return {
            className: computed(() => {
                if (this.refs.status != "info") {
                    return `ui-form-${define.direction} ui-${this.refs.status}-type`;
                } else {
                    return `ui-form-${define.direction}`;
                }
            }),

            style: computed(() => {
                if (define.width) return { width: define.width + "px" };
                else return {};
            }),
        };
    }

    #useMethods(define: UiFormItemProps, rules: { [name: string]: UiTypes.verifyRule[] }, data: { [name: string]: any }) {
        //* 校验提示显示函数
        const show = (content: string, type?: UiTypes.type) => {
            this.refs.status = type || "info";
            this.refs.visible = true;
            this.refs.content = content;
        };

        //* 校验提示隐藏函数
        const hidden = () => {
            this.refs.visible = false;
            this.refs.status = "info";
        };

        //* 校验提示触发函数
        const trigger = (content: string, type?: UiTypes.type) => {
            //* 1. 未触发校验提示则直接显示
            if (!this.refs.visible) show(content, type);
            //* 2. 当前为触发校验提示状态时, 先隐藏旧的校验提示后在触发新的校验提示
            hidden();
            this.refs.timer && clearTimeout(this.refs.timer);
            this.refs.timer = setTimeout(() => {
                this.refs.timer = undefined;
                this.refs.status = type || "info";
                this.refs.visible = true;
                this.refs.content = content;
            }, 200);
        };

        //* 校验函数
        const validator = async (name: string, callBack: (result: boolean) => void) => {
            //* 1. 数据初始化
            const verifys: (Promise<UiTypes.verifyResult> | UiTypes.verifyResult)[] = []; // 校验列表
            const rule = rules[define.prop as string].filter((value) => value.trigger == name || name == "all"); // 筛选校验规则
            //* 2. 检测是否存在校验规则
            if (!rule.length) return;
            //* 3. 遍历生成校验列表
            rule.forEach((value) => verifys.push(value.verify(data)));
            //* 4. 获取校验结果
            const result = await Promise.all(verifys);
            //* 5. 获取校验失败列表
            const error = result.filter((value) => !value.verify);
            //* 6. 根据是否存在校验失败选择触发提示or隐藏提示
            if (error.length) {
                callBack && callBack(false);
                trigger(error[0].message || "", error[0].type || "error");
            } else {
                hidden();
                callBack && callBack(true);
            }
        };

        return { show, hidden, trigger, validator };
    }
}
