import { UiTooltipProps, UiTooltipViewType } from "./tooltip";
import { ref } from "vue";

export default (define: UiTooltipProps, view: UiTooltipViewType) => {
    //* 初始化node
    const main = ref<HTMLElement | undefined>();
    const triangle = ref<HTMLElement | undefined>();
    const container = ref<HTMLElement | undefined>();
    return {
        main,
        triangle,
        container,
        //* 触发函数
        trigger: (trigger: string, show: boolean, ev?: MouseEvent) => {
            if ((define.mode == "fixed" && define.trigger != trigger) || define.disabled) return;
            switch (define.trigger) {
                case "click": {
                    return container.value ? view.hidden(0) : view.show(ev);
                }

                default: {
                    return show ? view.show(ev) : view.hidden();
                }
            }
        },
        //* 鼠标移入窗口中的触发函数
        triggerView: (show: boolean, timer: NodeJS.Timer | undefined) => {
            if (define.trigger != "click") {
                timer && clearTimeout(timer);
                timer = undefined;
                if (!show) {
                    view.hidden();
                }
            }
        },
    };
};
