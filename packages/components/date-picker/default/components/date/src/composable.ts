import { SetupContext, ref } from "vue";

import type { ModuleUpdateData } from "../../../src/types";
import type { UiPickerEmits } from "../index";
import type { ModuleDay } from "./types";

export const useComposable = (emits: SetupContext<typeof UiPickerEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        day: ref<number>(-1), //* 日
        year: ref<number>(-1), //* 年
        month: ref<number>(-1), //* 月
        days: ref<ModuleDay[]>([]), //* 日期列表
    };

    //* 函数列表
    const methods = {
        //* 切换选择器组件
        changeComponent: (mode: string) => emits("update", mode, {}),
        //* 切换时间
        changeDate: (date: ModuleUpdateData) => emits("update", "date", date),
        //* 选择日期
        changeDay: (date: ModuleDay) => emits("change", date),
    };

    //* 处理函数列表
    const disposes = {
        //* 初始化函数
        init: (date: Date) => {
            //* 设置年份与月份
            refs.day.value = date.getDate();
            refs.year.value = date.getFullYear();
            refs.month.value = date.getMonth();

            //* 初始化日份列表
            refs.days.value = [];

            //* 获取日份列表的开始日期
            const dateNext = disposes.receiveStartDate(new Date(date.getFullYear(), date.getMonth()));
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
                "ui-readonly-status": refs.month.value != month,
                "ui-active": refs.day.value == day && refs.year.value == year && refs.month.value == month,
            };
        },
    };

    return { refs, methods, disposes };
};
