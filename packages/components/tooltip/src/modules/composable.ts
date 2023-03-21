import { UiTooltipProps,UiTooltipViewType } from "../tooltip";
import { computed, ComputedRef } from "vue";

export type UiTooltipConstructorRefs = {
    main: HTMLElement | undefined;
    triangle: HTMLElement | undefined;
    container: HTMLElement | undefined;
};

export default class {
    refs: UiTooltipConstructorRefs;

    methods: {
        trigger: (trigger: string, show: boolean, ev?: MouseEvent) => void;
        triggerView: (show: boolean, timer: NodeJS.Timer | undefined) => void;
    };

    computeds: {
        style: ComputedRef<string>;
        className: ComputedRef<string>;
    };

    constructor(refs: UiTooltipConstructorRefs, define: UiTooltipProps,view:UiTooltipViewType) {
        this.refs = refs;
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define,view);
    }

    #useComputeds(define: UiTooltipProps) {
        return {
            //* 样式
            style: computed(() => (define.width ? `min-width: ${define.width}px` : "")),
            //* 类名
            className: computed(() => {
                return define.effect ? `ui-effect-${define.effect}` : "";
            }),
        };
    }
    #useMethods(define: UiTooltipProps,view: UiTooltipViewType) {
        return {
            //* 触发函数
            trigger: (trigger: string, show: boolean, ev?: MouseEvent) => {
                if ((define.mode == "fixed" && define.trigger != trigger) || define.disabled) return;
                switch (define.trigger) {
                    case "click": {
                        return this.refs.container ? view.hidden(0) : view.show(ev);
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
    }
}
