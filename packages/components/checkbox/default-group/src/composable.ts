import { SetupContext } from "vue";
import { UiCheckboxGroupProps, UiCheckboxGroupEmits } from "../index";

export const useComposable = (define: UiCheckboxGroupProps, emits: SetupContext<typeof UiCheckboxGroupEmits>["emit"]) => {
    //* 初始化数据列表
    const values: any[] = [];

    //* 函数列表
    const methods = {
        switchMode: (mode: string) => {
            switch (mode) {
                case "all": {
                    define.modelValue.push(...values.filter((value) => !define.modelValue.includes(value)));
                    break;
                }

                case "cancel": {
                    define.modelValue.splice(0, define.modelValue.length);
                    break;
                }

                case "reverse": {
                    //* 获取未选中列表
                    const result = values.filter((value) => !define.modelValue.includes(value));
                    //* 清空已选中列表
                    define.modelValue.splice(0, define.modelValue.length);
                    //* 将未选择列表填入已选中列表中
                    define.modelValue.push(...result);
                    break;
                }
            }
        },
    };

    return { methods, values };
};
