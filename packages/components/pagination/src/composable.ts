import { computed, SetupContext } from "vue";
import { UiPaginationProps, UiPaginationEmits } from "./pagination";
import { utility } from "@various/utils";

type UiPaginationOption = {
    type: "item" | "skip";
    value: number;
    active: boolean;
};

export default class {
    computeds;
    methods;

    constructor(define: UiPaginationProps, emit: SetupContext<typeof UiPaginationEmits>["emit"]) {
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define, emit);
    }

    #useComputeds(define: UiPaginationProps) {
        //* 统计信息
        const info = computed(() => {
            if (define.count) {
                return `Items: ${(define.modelValue - 1) * define.limit + 1} to ${define.modelValue * define.limit} of ${define.count}`;
            } else {
                return "";
            }
        });

        //* 分页的总数
        const total = computed(() => {
            return Math.ceil(define.count / define.limit);
        });

        //* 分页控制器
        const controls = computed(() => {
            //* 初始化数据
            const result: UiPaginationOption[] = [];
            //* 1. 当分页总数小于等于9时, 展示全部
            if (total.value <= 9) {
                for (let i = 1; i <= total.value; i++) {
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
                    result.push({ type: "item", value: total.value - 1, active: total.value - 1 == define.modelValue });
                    result.push({ type: "item", value: total.value, active: total.value == define.modelValue });
                } else if (define.modelValue >= total.value - 3) {
                    //* 3.1. 补充前置控制器
                    result.push({ type: "item", value: 1, active: 1 == define.modelValue });
                    result.push({ type: "item", value: 2, active: 2 == define.modelValue });
                    result.push({ type: "skip", value: -1, active: false });

                    //* 3.2. 当前分页大于等于最后4页时, 展示total - 5 ~ total分页
                    for (let i = total.value - 5; i <= total.value; i++) {
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
                    result.push({ type: "item", value: total.value - 1, active: total.value - 1 == define.modelValue });
                    result.push({ type: "item", value: total.value, active: total.value == define.modelValue });
                }
            }

            return result;
        });

        return { info, total, controls };
    }

    #useMethods(define: UiPaginationProps, emit: SetupContext<typeof UiPaginationEmits>["emit"]) {
        //? 通过页码切换分页
        const cutNumber = (number: number) => {
            if (!utility.isNumber(number) || number == define.modelValue) return;
            if (number <= 0) {
                emit("update:modelValue", 1);
                emit("change", 1);
            } else if (number > this.computeds.total.value) {
                emit("update:modelValue", this.computeds.total.value);
                emit("change", this.computeds.total.value);
            } else {
                emit("update:modelValue", number);
                emit("change", number);
            }
        };

        return {
            cutNumber,
            next: () => {
                if (define.modelValue >= this.computeds.total.value) return;
                else {
                    cutNumber(define.modelValue + 1);
                }
            },
            back: () => {
                if (define.modelValue <= 1) return;
                else {
                    cutNumber(define.modelValue - 1);
                }
            },
        };
    }
}
