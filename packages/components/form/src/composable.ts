import _ from "lodash";
import { Emitter } from "mitt";
import { UiTypes } from "@various/constants";
import { UiFormProps } from "./form";

export type UiFormConstructorRefs = {
    form: HTMLFormElement | undefined;
};

export default class {
    refs: UiFormConstructorRefs;

    methods: {
        validator: (callBack: (result: boolean) => void) => Promise<void>;
        reset: () => void;
    };

    constructor(refs: UiFormConstructorRefs, define: UiFormProps, emitter: Emitter<any>) {
        this.refs = refs;
        this.methods = this.#useMethods(define, emitter);
    }

    #useMethods(define: UiFormProps, emitter: Emitter<any>) {
        const data = _.cloneDeep(define.data);

        //? 表单校验函数
        const validator = async (callBack: (result: boolean) => void) => {
            //* 1. 检测是否允许向下执行
            if (!define.rules) return;
            //* 2. 初始化数据
            const errors: { name: string; result: UiTypes.verifyResult }[] = [];
            //* 3. 遍历生成校验队列
            for (const i in define.rules) {
                //* 3.1 初始化校验队列
                const alignment: (Promise<UiTypes.verifyResult> | UiTypes.verifyResult)[] = [];
                //* 3.2 添加校验
                define.rules[i].forEach((value) => alignment.push(value.verify(define.data)));
                //* 3.3 获取校验结果
                const result = await Promise.all(alignment);
                //* 3.4 获取校验失败列表
                const error = result.filter((value) => (!value.type || value.type == "error") && !value.verify);
                //* 3.5 存在校验失败则添加入队列中
                if (error && error.length) {
                    errors.push({ name: i, result: error[0] });
                }
            }
            //* 4. 根据是否存在校验失败选择触发提示or触发回调函数
            if (errors.length) {
                errors.forEach((error) => emitter.emit(`trigger:${error.name}`, error.result));
                callBack && callBack(false);
            } else {
                callBack && callBack(true);
            }
        };

        //? 表单重置函数
        const reset = () => {
            _.forIn(define.rules, async (value, index) => {
                emitter.emit(`reset:${index}`);
            });

            _.forIn(data, (value, index) => {
                define.data[index] = value;
            });
        };

        return { validator, reset };
    }
}
