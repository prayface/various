import { createApp } from "vue";
import { register } from "@various/utils";
import { UiLoading, UiHTMLElement } from "@various/constants";

const directive = {
    name: "loading",
    mounted: (el: UiHTMLElement, res: any) => {
        //* 初始化
        const app = createApp(UiLoading, { message: "", visible: false });
        const instance = app.mount(document.createElement("div"));

        //* 检测是否需要添加Position
        if (el.style.position == "") {
            el.classList.add("ui-relative");
        }

        //* 缓存Loading并将Loading插入Dom中
        el.app = app;
        el.instance = instance;
        el.appendChild(instance.$el);
        el.instance.$.props.visible = res.value;
    },
    updated: (el: UiHTMLElement, res: any) => {
        if (el.instance) {
            el.instance.$.props.visible = res.value;
        }
    },
    unmounted: (el: UiHTMLElement) => {
        el.app && el.app.unmount();
    },
};

export const vLoading = register.use(directive, "directive");
export default vLoading;
