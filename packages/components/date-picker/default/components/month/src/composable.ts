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
    };

    //* 函数列表
    const methods = {
        //* 切换时间
        changeDate: (date: ModuleUpdateData) => emits("update", "month", date),
        //* 选择月份
        changeMonth: (month: number) => emits("change", { month: month, year: refs.year.value }),
    };

    //* 处理函数列表
    const disposes = {
        //* 初始化函数
        init: (date: Date, realityDate?: Date) => {
            //* 初始化日期数据
            refs.year.value = date.getFullYear();
            refs.realityDate.value = realityDate;
        },

        //* 获取当前月份的className
        receiveDayClassName: (month: number) => {
            return {
                "ui-active": refs.realityDate.value?.getFullYear() == refs.year.value && refs.realityDate.value?.getMonth() == month,
            };
        },
    };

    return { refs, methods, disposes };
};
