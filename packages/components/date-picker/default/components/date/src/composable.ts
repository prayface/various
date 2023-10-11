import { SetupContext, ref } from "vue";

import type { ModuleUpdateData, ModuleInitData } from "../../../src/types";
import type { UiPickerEmits } from "../index";
import type { ModuleDay } from "./types";

export const useComposable = (emits: SetupContext<typeof UiPickerEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        day: ref<number>(-1),
        days: ref<ModuleDay[]>([]),
        year: ref<number>(-1),
        month: ref<number>(-1),
        realityDate: ref<Date | undefined>(), //* 真实日期
    };

    //* 静态变量
    const variable = {
        disabled: undefined as ((date: Date) => boolean) | undefined,
    };

    //* 函数列表
    const methods = {
        //* 切换选择器组件
        changeComponent: (mode: string) => emits("update", mode, {}),
        //* 切换时间
        changeDate: (date: ModuleUpdateData) => emits("update", "date", date),
        //* 选择日期
        changeDay: (date: ModuleDay) => {
            if (!(variable.disabled && variable.disabled(new Date(`${date.year}-${date.month + 1}-${date.day}`)))) {
                emits("change", date);
            }
        },
    };

    //* 处理函数列表
    const disposes = {
        //* 初始化函数
        init: (data: ModuleInitData, disabled?: (date: Date) => boolean) => {
            //* 初始化日期数据
            refs.day.value = data.date.getDate();
            refs.year.value = data.date.getFullYear();
            refs.month.value = data.date.getMonth();
            refs.realityDate.value = data.realityDate;
            variable.disabled = disabled;

            //* 初始化日份列表
            refs.days.value = [];

            //* 获取日份列表的开始日期
            const dateNext = disposes.receiveStartDate(new Date(data.date.getFullYear(), data.date.getMonth()));
            for (let i = 0; i < 42; i++) {
                const current = new Date(dateNext.getFullYear(), dateNext.getMonth(), dateNext.getDate() + i);
                refs.days.value.push({
                    day: current.getDate(),
                    year: current.getFullYear(),
                    month: current.getMonth(),
                });
            }
        },

        //* 获取开始的日期对象
        receiveStartDate: (date: Date) => {
            //* 数据初始化
            let day = date.getDay();
            if (day == 0) day = 7;
            else if (day == 1) {
                return date;
            }

            //* 返回日期
            return new Date(date.getFullYear(), date.getMonth(), (day - 2) * -1);
        },

        //* 获取当前日期的className
        receiveDayClassName: (year: number, month: number, day: number) => {
            return {
                "ui-disabled-status": variable.disabled && variable.disabled(new Date(`${year}-${month + 1}-${day}`)),
                "ui-readonly-status": refs.month.value != month,
                "ui-active":
                    refs.realityDate.value?.getDate() == day &&
                    refs.realityDate.value?.getFullYear() == year &&
                    refs.realityDate.value?.getMonth() == month,
            };
        },
    };

    return { refs, methods, disposes };
};
