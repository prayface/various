import { UiTooltipProps } from "../tooltip";
import { nextTick, watch, WatchStopHandle } from "vue";
import { node, dispose } from "@various/utils";

export type UiTooltipConstructorRefs = {
    main?: HTMLElement;
    triangle?: HTMLElement;
    container?: HTMLElement;
    viewVisible: boolean;
    timer?: NodeJS.Timer;
};

export default class {
    refs: UiTooltipConstructorRefs;
    watchs: {
        stop: WatchStopHandle;
    };

    methods: {
        show: (ev?: MouseEvent) => void;
        hidden: (delay?: number) => void;
        trigger: (trigger: string, show: boolean, ev?: MouseEvent) => void;
        triggerView: (show: boolean, timer: NodeJS.Timer | undefined) => void;
    };

    handles: {
        mainHandles: {
            mousemove: (ev: MouseEvent) => void;
            mouseenter: (ev: MouseEvent) => void;
            mouseleave: (ev: MouseEvent) => void;
        };

        containerHandles: {
            mouseenter: () => void;
            mouseleave: () => void;
        };
    };

    constructor(refs: UiTooltipConstructorRefs, define: UiTooltipProps) {
        this.refs = refs;
        this.methods = this.#useMethods(define);
        this.handles = this.#useOnHandles();
        this.watchs = this.#useWatch(define);
    }

    #useWatch(define: UiTooltipProps) {
        return {
            //* 侦听器, 用于侦听visible属性, 对窗口进行隐藏
            stop: watch(
                () => define.visible,
                () => {
                    define.visible && this.refs.container && this.methods.hidden(0);
                }
            ),
        };
    }

    #useMethods(define: UiTooltipProps) {
        return {
            //* 视图控制器 显示
            show: (ev?: MouseEvent) => {
                this.refs.timer && clearTimeout(this.refs.timer);
                this.refs.timer = undefined;
                this.refs.viewVisible = true;
                nextTick(() => {
                    if (this.refs.container && ev) {
                        //* 将content添加到视图容器中
                        node.append("ui-windows", this.refs.container);
                        //* 根据配置计算当前窗口位置
                        dispose.elementToMouseBoundary(ev, this.refs.container, {
                            offsetX: define.offsetX || 20,
                            offsetY: define.offsetY || 20,
                        });
                    }
                });
            },

            //* 视图控制器 隐藏
            hidden: (delay: number = 200) => {
                this.refs.timer && clearTimeout(this.refs.timer);
                this.refs.timer = setTimeout(() => {
                    this.refs.viewVisible = false;
                }, delay);
            },

            //* 触发函数
            trigger: (trigger: string, show: boolean, ev?: MouseEvent) => {
                if ((define.mode == "fixed" && define.trigger != trigger) || define.disabled) return;
                switch (define.trigger) {
                    case "click": {
                        return this.refs.container ? this.methods.hidden(0) : this.methods.show(ev);
                    }

                    default: {
                        return show ? this.methods.show(ev) : this.methods.hidden();
                    }
                }
            },

            //* 鼠标移入窗口中的触发函数
            triggerView: (show: boolean, timer: NodeJS.Timer | undefined) => {
                if (define.trigger != "click") {
                    timer && clearTimeout(timer);
                    timer = undefined;
                    if (!show) {
                        this.methods.hidden();
                    }
                }
            },
        };
    }

    #useOnHandles() {
        return {
            //* ui-tooltip的处理函数
            mainHandles: {
                mouseenter: (ev: MouseEvent) => this.methods.trigger("follow", true, ev),
                mouseleave: (ev: MouseEvent) => this.methods.trigger("follow", false, ev),
                mousemove: (ev: MouseEvent) => this.methods.trigger("follow", true, ev),
            },

            //* ui-tooltip-container的处理函数
            containerHandles: {
                mouseenter: () => this.methods.triggerView(true, this.refs.timer),
                mouseleave: () => this.methods.triggerView(false, this.refs.timer),
            },
        };
    }
}
