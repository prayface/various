//* 插件
import { SetupContext, ref, shallowRef } from "vue";

//* 组件属性
import { UiPickerEmits } from "../index";
import type { ModuleUpdateData, ModuleInitData } from "../../../src/types";

export const useComposable = (emits: SetupContext<typeof UiPickerEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        year: ref<number>(-1),
        months: shallowRef<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
        realityDate: ref<Date | undefined>(), //* 真实日期
    };

    //* 静态变量
    const variable = {
        disabled: undefined as ((date: Date) => boolean) | undefined,
    };

    //* 函数列表
    const methods = {
        //* 切换时间
        changeDate: (date: ModuleUpdateData) => emits("update", "month", date),
        //* 选择月份
        changeMonth: (month: number) => {
            if (!(variable.disabled && variable.disabled(new Date(`${refs.year.value}-${month + 1}`)))) {
                emits("change", { month: month, year: refs.year.value });
            }
        },
    };

    //* 处理函数列表
    const disposes = {
        //* 初始化函数
        init: (data: ModuleInitData, disabled?: (date: Date) => boolean) => {
            //* 初始化数据
            refs.year.value = data.date.getFullYear();
            refs.realityDate.value = data.realityDate;
            variable.disabled = disabled;
        },

        //* 获取当前月份的className
        receiveDayClassName: (month: number) => {
            return {
                "ui-active": refs.realityDate.value?.getFullYear() == refs.year.value && refs.realityDate.value?.getMonth() == month,
                "ui-disabled-status": variable.disabled && variable.disabled(new Date(`${refs.year.value}-${month + 1}`)),
            };
        },
    };

    return { refs, methods, disposes };
};
