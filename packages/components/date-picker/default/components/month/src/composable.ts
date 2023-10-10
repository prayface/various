//* 插件
import { SetupContext, ref, shallowRef } from "vue";

//* 组件属性
import { UiPickerEmits } from "../index";
import type { ModuleUpdateData } from "../../../src/types";

export const useComposable = (emits: SetupContext<typeof UiPickerEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        year: ref<number>(-1),
        months: shallowRef<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
        realityDate: ref<Date | undefined>(), //* 真实日期
        disabledDate: ref<{ [name: string]: Date | undefined }>(), //* 禁止日期范围
    };

    //* 函数列表
    const methods = {
        //* 切换时间
        changeDate: (date: ModuleUpdateData) => emits("update", "month", date),
        //* 选择月份
        changeMonth: (month: number) => !disposes.disabledDate(month) && emits("change", { month: month, year: refs.year.value }),
    };

    //* 处理函数列表
    const disposes = {
        //* 初始化函数
        init: (date: Date, realityDate?: Date, disabledDate?: { [name: string]: Date | undefined }) => {
            //* 初始化日期数据
            refs.year.value = date.getFullYear();
            refs.realityDate.value = realityDate;
            refs.disabledDate.value = disabledDate;
        },

        //* 获取当前月份的className
        receiveDayClassName: (month: number) => {
            return {
                "ui-active": refs.realityDate.value?.getFullYear() == refs.year.value && refs.realityDate.value?.getMonth() == month,
                "ui-disabled-status": disposes.disabledDate(month)
            };
        },

        //* 判断当前月份是否禁止
        disabledDate: (month: number) => {
            //* 当前时间对象
            const date = new Date(refs.year.value + '/' + (month + 1));

            //* 同时存在开始禁止时间和结束禁止时间
            if (disposes.isValidDate(refs.disabledDate.value?.start) && disposes.isValidDate(refs.disabledDate.value?.end)) {
                return refs.disabledDate.value?.start && refs.disabledDate.value?.end &&
                    refs.disabledDate.value?.start <= date &&
                    refs.disabledDate.value?.end >= date
            } else if (disposes.isValidDate(refs.disabledDate.value?.start)) { //* 只存在开始禁止时间
                return refs.disabledDate.value?.start && refs.disabledDate.value?.start <= date
            } else if (disposes.isValidDate(refs.disabledDate.value?.end)) { //* 只存在结束禁止时间
                return refs.disabledDate.value?.end && refs.disabledDate.value?.end >= date
            }
        },

        //* 检查Date对象是否为Invalid Date
        isValidDate(date: Date | undefined) {
            return date instanceof Date && !isNaN(date.getTime());
        }
    };

    return { refs, methods, disposes };
};
