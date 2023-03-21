import { UiButtonProps } from "./button";
import { computed, ComputedRef } from "vue";

export default class {
    computeds: {
        style: ComputedRef<string>;
        disabled: ComputedRef<boolean>;
        className: ComputedRef<string>;
        status: ComputedRef<{ is: boolean; name: string }>;
    };

    constructor(define: UiButtonProps) {
        this.computeds = this.#useComputeds(define);
    }

    #useComputeds(define: UiButtonProps) {
        //* 当前组件状态
        const status = computed(() => {
            if (define.loading) {
                return { is: true, name: "loading" };
            } else if (define.disabled) {
                return { is: false, name: "disabled" };
            } else {
                return { is: false, name: "default" };
            }
        });

        return {
            status: status,
            //* 样式
            style: computed(() => (define.width ? `min-width: ${define.width}px` : "")),
            //* 禁用状态
            disabled: computed(() => status.value.name != "default"),
            //* 类名
            className: computed(() => {
                //* 1. 数据初始化
                const result: string[] = [];
                //* 2. 根据需求添加类名
                if (define.simple) result.push("ui-button-simple");
                if (define.size != "default") result.push(`ui-${define.size}`);
                if (define.type != "info") result.push(`ui-${define.type}-type`);
                if (status.value.name == "loading") result.push("ui-loading-status");
                else if (status.value.name == "disabled") result.push("ui-disabled-status");
                //* 3. 输出结果
                return result.join(" ");
            }),
        };
    }
}
