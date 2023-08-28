import { ref, inject, computed } from "vue";
import { UiFormItemProps } from "../index";
import { UiFormEmitterKey, UiFormRulesKey, UiFormDataKey, UiTypes } from "@various/constants";

export const useComposable = (define: UiFormItemProps) => {
    //* 获取注入函数
    const emitter = inject(UiFormEmitterKey, undefined);
    const rules = inject(UiFormRulesKey, {});
    const data = inject(UiFormDataKey, {});

    //* 响应式变量
    const refs = {
        verifyTimer: ref<NodeJS.Timer>(), //* 校验过渡定时器
        visible: ref<boolean>(false), //* 校验提示显示状态
        content: ref<string>(""), //* 校验提示的文本
        status: ref<UiTypes.type>("info"), //* 校验提示的类型
    };

    //* 函数列表
    const methods = {
        //* 校验显示函数
        show: (content: string, type?: UiTypes.type) => {
            refs.status.value = type || "info";
            refs.visible.value = true;
            refs.content.value = content;
        },

        //* 校验隐藏函数
        hidden: () => {
            refs.visible.value = false;
            refs.status.value = "info";
        },

        //* 校验提示显示函数
        trigger: (content: string, type?: UiTypes.type) => {
            //* 未触发校验提示则直接显示
            if (!refs.visible.value) methods.show(content, type);
            else {
                //* 隐藏旧的校验提示
                methods.hidden();
                //* 重新挂载校验提示过渡计时器
                refs.verifyTimer.value && clearTimeout(refs.verifyTimer.value);
                refs.verifyTimer.value = setTimeout(() => {
                    refs.verifyTimer.value = undefined;
                    refs.content.value = content;
                    refs.visible.value = true;
                    refs.status.value = type || "info";
                }, 200);
            }
        },

        //* 校验函数
        validator: async (name?: string, callBack?: (result: boolean) => void) => {
            //* 获取校验规则
            const rule = rules[define.prop as string].filter((value) => !name || value.trigger == name);
            //* 检测是否存在校验选项
            if (!rule.length) return;
            else {
                //* 初始化校验队列
                const verifys: (Promise<UiTypes.verifyResult> | UiTypes.verifyResult)[] = [];
                //* 将校验事件添加入队列中
                rule.forEach((value) => verifys.push(value.verify(data)));
                //* 获取校验结果
                const result = await Promise.all(verifys);
                //* 获取校验失败列表
                const error = result.filter((value) => !value.verify);
                //* 根据是否存在校验失败选择触发提示or隐藏提示
                if (error.length) {
                    callBack && callBack(false);
                    methods.trigger(error[0].message || "", error[0].type || "error");
                } else {
                    methods.hidden();
                    callBack && callBack(true);
                }
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* 组件类名
        className: computed(() => {
            if (refs.status.value != "info") {
                return `ui-form-${define.direction} ui-${refs.status.value}-type`;
            } else {
                return `ui-form-${define.direction}`;
            }
        }),

        //* 组件样式
        style: computed(() => {
            if (define.width) return { width: define.width + "px" };
            else return {};
        }),
    };

    return { data, refs, rules, methods, emitter, computeds };
};
