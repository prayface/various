import { createApp } from "vue";
import { UiLoading, UiHTMLElement } from "@various/constants";

export type UiLoadingShowOption = {
    icon?: string;
    delay?: number;
    message?: string;
};

export type UiLoadingHandles = {
    timer?: NodeJS.Timeout;
    delay: boolean;
    open: (config?: UiLoadingShowOption) => void;
    close: () => void;
};

//* 真实的Show函数
const show = (config?: UiLoadingShowOption) => {
    //* 数据初始化
    const body = document.body as UiHTMLElement;
    const size = innerWidth - document.documentElement.clientWidth;

    //* 调整body样式, 隐藏滚动条
    if (size) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.paddingRight = size + "px";
    }

    //* 判断body是否已挂载Loading组件
    if (body.instance) {
        //* 属性变更
        if (config?.icon) body.instance.$.props.icon = config.icon;
        if (config?.message) body.instance.$.props.message = config.message;
    } else {
        //* 组件挂载
        //* 创建新的Vue实例
        const app = createApp(UiLoading, Object.assign({ visible: false, mode: "fixed" }, config));
        const instance = app.mount(document.createElement("div"));

        //* 检测是否需要添加Position
        if (body.style.position == "") body.classList.add("ui-relative");

        //* 缓存Loading并将Loading插入body中
        body.app = app;
        body.instance = instance;
        body.appendChild(instance.$el);
    }

    //* 显示Loading
    body.instance.$.props.visible = true;
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
        const body = document.body as UiHTMLElement;

        //* 检测是否需要延迟关闭
        if (this.delay) {
            this.delay = false;
            this.timer = setTimeout(() => {
                //* 隐藏Loading
                if (body.instance) body.instance.$.props.visible = false;
                //* 还原body样式
                document.documentElement.style.overflow = "";
                document.documentElement.style.paddingRight = "";
            }, 500);
        } else if (body.instance) {
            //* 还原body样式
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "";
            //* 隐藏Loading
            body.instance.$.props.visible = false;
        }
    },
};

export { $loading };
export default $loading;
