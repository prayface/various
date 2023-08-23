import mitt from "mitt";
import { ref } from "vue";
import { UiFormProps } from "../index";
import { utility } from "@various/utils";
import { UiTypes } from "@various/constants";

export const useComposable = (define: UiFormProps) => {
    //* 静态变量
    const variable = {
        data: utility.cloneDeep(define.data),
    };

    //* 响应式变量
    const emitter = mitt();
    const refs = {
        form: ref<HTMLFormElement>(),
    };

    //* 函数列表
    const methods = {
        //* 表单重置函数
        reset: () => {
            //* 校验重置
            for (const index in define.rules) {
                emitter.emit(`reset:${index}`);
            }

            //* value重置
            for (const index in variable.data) {
                if (utility.isArray(define.data[index])) {
                    define.data[index].splice(0, define.data[index].length);
                } else if (utility.isObject(define.data[index])) {
                    define.data[index] = utility.cloneDeep(variable.data[index]);
                } else {
                    define.data[index] = variable.data[index];
                }
            }
        },

        //* 表单校验函数
        validator: async (callBack: (result: boolean) => void, list?: string[]) => {
            //* 检测是否存在校验选项
            if (!define.rules) return;

            //* 初始化错误列表
            const errors: { name: string; result: UiTypes.verifyResult }[] = [];

            //* 遍历校验选项列表进行校验
            for (const i in define.rules) {
                //* 检测是否需要进行校验
                if (list && !list.includes(i)) continue;
                else {
                    //* 初始化校验队列
                    const alignment: (Promise<UiTypes.verifyResult> | UiTypes.verifyResult)[] = [];
                    //* 将校验事件添加入队列中
                    define.rules[i].forEach((value) => alignment.push(value.verify(define.data)));
                    //* 获取校验结果
                    const result = await Promise.all(alignment);
                    //* 获取校验失败列表
                    const error = result.filter((value) => (!value.type || value.type == "error") && !value.verify);
                    //* 存在校验失败则添加入队列中
                    if (error && error.length) {
                        errors.push({ name: i, result: error[0] });
                    } else {
                        emitter.emit(`reset:${i}`);
                    }
                }
            }

            //* 根据是否存在校验失败选择触发提示or触发回调函数
            if (errors.length) {
                errors.forEach((error) => emitter.emit(`trigger:${error.name}`, error.result));
                callBack && callBack(false);
            } else {
                callBack && callBack(true);
            }
        },
    };

    return {
        emitter,
        methods,
        refs,
    };
};
