import { createApp } from "vue";
import { UiLoading, UiHTMLElement } from "@various/constants";

export type UiLoadingShowOption = {
    icon?: string;
    delay?: number;
    message?: string;
};

export type UiLoadingHandles = {
    timer?: NodeJS.Timer;
    delay: boolean;
    open: (config?: UiLoadingShowOption) => void;
    close: () => void;
};

//* 真实的Show函数
const show = (config?: UiLoadingShowOption) => {
    //* 获取body
    const el = document.body as UiHTMLElement;

    //* 调整body样式, 隐藏滚动条
    el.style.overflow = "hidden";
    el.style.paddingRight = "12px";

    //* 判断body是否已挂载Loading组件
    if (el.instance) {
        //* 属性变更
        if (config?.icon) el.instance.$.props.icon = config.icon;
        if (config?.message) el.instance.$.props.message = config.message;
    } else {
        //* 组件挂载
        //* 创建新的Vue实例
        const app = createApp(UiLoading, Object.assign({ visible: false, mode: "fixed" }, config));
        const instance = app.mount(document.createElement("div"));

        //* 检测是否需要添加Position
        if (el.style.position == "") el.classList.add("ui-relative");

        //* 缓存Loading并将Loading插入body中
        el.app = app;
        el.instance = instance;
        el.appendChild(instance.$el);
    }

    //* 显示Loading
    el.instance.$.props.visible = true;
};

const $loading: UiLoadingHandles = {
    delay: false,
    timer: undefined,

    //* 虚假的Show函数, 用于控制Loading延迟显示
    open: function (config?: UiLoadingShowOption) {
        //* 清除上一个延时器
        this.timer && clearTimeout(this.timer);

        //* 判断是否需要添加延时器
        if (config?.delay) {
            this.timer = setTimeout(() => {
                show(config);
                this.delay = true;
            }, config.delay);
        } else {
            show(config);
        }
    },

    close: function () {
        //* 清除延时器
        this.timer && clearTimeout(this.timer);

        //* 获取body
        const el = document.body as UiHTMLElement;

        //* 检测是否需要延迟关闭
        if (this.delay) {
            this.delay = false;
            this.timer = setTimeout(() => {
                //* 还原body样式
                el.style.overflow = "";
                el.style.paddingRight = "";
                //* 隐藏Loading
                if (el.instance) el.instance.$.props.visible = false;
            }, 1000);
        } else if (el.instance) {
            //* 还原body样式
            el.style.overflow = "";
            el.style.paddingRight = "";
            //* 隐藏Loading
            el.instance.$.props.visible = false;
        }
    },
};

export { $loading };
export default $loading;
