import { computed, SetupContext } from "vue";
import { UiPaginationProps, UiPaginationEmits } from "../index";
import { utility } from "@various/utils";

type UiPaginationOption = {
    type: "item" | "skip";
    value: number;
    active: boolean;
};

export const useComposable = (define: UiPaginationProps, emits: SetupContext<typeof UiPaginationEmits>["emit"]) => {
    //* 计算属性
    const computeds = {
        //* 分页的总数
        total: computed(() => Math.ceil(define.count / define.limit)),

        //* 统计信息
        info: computed(() => {
            if (define.count) {
                const start = (define.modelValue - 1) * define.limit + 1;
                const end = define.modelValue * define.limit;

                return `Items: ${start} to ${end > define.count ? define.count : end} of ${define.count}`;
            } else {
                return "";
            }
        }),

        //* 分页控制器
        controls: computed(() => {
            //* 初始化数据
            const result: UiPaginationOption[] = [];
            //* 1. 当分页总数小于等于9时, 展示全部
            if (computeds.total.value <= 9) {
                for (let i = 1; i <= computeds.total.value; i++) {
                    result.push({ type: "item", value: i, active: i == define.modelValue });
                }
            } else {
                if (define.modelValue <= 5) {
                    //* 2.1. 当前分页小于等于5时, 展示1~6分页
                    for (let i = 1; i <= 6; i++) {
                        result.push({ type: "item", value: i, active: i == define.modelValue });
                    }

                    //* 2.2. 补充剩余控制器
                    result.push({ type: "skip", value: 1, active: false });
                    result.push({ type: "item", value: computeds.total.value - 1, active: computeds.total.value - 1 == define.modelValue });
                    result.push({ type: "item", value: computeds.total.value, active: computeds.total.value == define.modelValue });
                } else if (define.modelValue >= computeds.total.value - 3) {
                    //* 3.1. 补充前置控制器
                    result.push({ type: "item", value: 1, active: 1 == define.modelValue });
                    result.push({ type: "item", value: 2, active: 2 == define.modelValue });
                    result.push({ type: "skip", value: -1, active: false });

                    //* 3.2. 当前分页大于等于最后4页时, 展示total - 5 ~ total分页
                    for (let i = computeds.total.value - 5; i <= computeds.total.value; i++) {
                        result.push({ type: "item", value: i, active: i == define.modelValue });
                    }
                } else {
                    //* 4.1. 补充前置控制器
                    result.push({ type: "item", value: 1, active: 1 == define.modelValue });
                    result.push({ type: "item", value: 2, active: 2 == define.modelValue });
                    result.push({ type: "skip", value: -1, active: false });

                    //* 4.2. 当前分页前后的控制器
                    for (let i = define.modelValue - 1; i <= define.modelValue + 1; i++) {
                        result.push({ type: "item", value: i, active: i == define.modelValue });
                    }

                    //* 4.3. 补充剩余控制器
                    result.push({ type: "skip", value: 1, active: false });
                    result.push({ type: "item", value: computeds.total.value - 1, active: computeds.total.value - 1 == define.modelValue });
                    result.push({ type: "item", value: computeds.total.value, active: computeds.total.value == define.modelValue });
                }
            }

            return result;
        }),
    };

    //* 函数列表
    const methods = {
        //* 切换分页
        switchNumber: (_number: number) => {
            if (!utility.isNumber(_number) || _number == define.modelValue) return;
            if (_number <= 0) {
                emits("update:modelValue", 1);
                emits("change", 1);
            } else if (_number > computeds.total.value) {
                emits("update:modelValue", computeds.total.value);
                emits("change", computeds.total.value);
            } else {
                emits("update:modelValue", _number);
                emits("change", _number);
            }
        },

        //* 下一页
        next: () => {
            if (define.modelValue >= computeds.total.value) return;
            else {
                methods.switchNumber(define.modelValue + 1);
            }
        },

        //* 上一页
        back: () => {
            if (define.modelValue <= 1) return;
            else {
                methods.switchNumber(define.modelValue - 1);
            }
        },
    };

    return { computeds, methods };
};
