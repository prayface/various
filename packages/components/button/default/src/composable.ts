import { computed, SetupContext } from "vue";
import { UiButtonEmits, UiButtonProps } from "../index";
import { utility } from "@various/utils";

export const useComposable = (define: UiButtonProps, emits: SetupContext<typeof UiButtonEmits>["emit"]) => {
    //* 组件状态
    const status = computed(() => {
        if (define.loading) return { is: true, name: "loading" };
        else if (define.disabled) return { is: false, name: "disabled" };
        else if (define.readonly) return { is: false, name: "readonly" };
        else {
            return { is: false, name: "default" };
        }
    });

    //* 公共属性
    const computeds = {
        //* 主体样式
        style: computed(() => {
            if (!define.width) return {};
            else if (utility.isNumber(define.width)) {
                return { "min-width": define.width + "px" };
            } else {
                return { "min-width": define.width };
            }
        }),

        //* 禁用状态
        disabled: computed(() => {
            return ["loading", "disabled", "readonly"].includes(status.value.name);
        }),

        //* 主体类名
        className: computed(() => {
            //* 数据初始化
            const result: string[] = [];

            //* 根据需求添加类名
            if (define.simple) result.push("ui-button-simple");
            if (define.size != "default") result.push(`ui-${define.size}`);
            if (define.type != "info") result.push(`ui-${define.type}-type`);
            if (status.value.name == "loading") result.push("ui-loading-status");
            else if (status.value.name == "disabled") result.push("ui-disabled-status");
            else if (status.value.name == "readonly") result.push("ui-readonly-status");

            //* 输出结果
            return result.join(" ");
        }),
    };

    //* 函数列表
    const methods = {
        click: (ev?: MouseEvent | Event) => {
            if (computeds.disabled.value) return;
            else {
                emits("click", ev);
            }
        },
    };

    return { status, computeds, methods };
};
