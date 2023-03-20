import { createApp, App, ComponentPublicInstance } from "vue";
import { register } from "@various/utils";
import Loading from "./src/loading.vue";

interface EL extends HTMLElement {
    app?: App<Element>;
    instance?: ComponentPublicInstance;
}

const init = (el: EL, config: any) => {
    //* 初始化
    const app = createApp(Loading, config);
    const instance = app.mount(document.createElement("div"));

    //* 检测是否需要添加Position
    if (el.style.position == "") {
        el.classList.add("ui-relative");
    }

    //* 缓存Loading并将Loading插入Dom中
    el.app = app;
    el.instance = instance;
    el.appendChild(instance.$el);
};

const directive = {
    name: "loading",
    mounted: (el: any, res: any) => init(el, { content: "", show: res.value }),
    updated: (el: any, res: any) => {
        if (el.instance) {
            el.instance.$.props.show = res.value;
        }
    },
    unmounted: (el: any) => {
        el.app && el.app.unmount();
    },
};

export * from "./src/loading";
export const VLoading = register.use(directive, "directive");
export const $loading = {
    open: (config: any) => {
        const el = document.body as EL;
        if (el.instance) {
            for (let i in config) {
                el.instance.$.props[i] = config[i];
            }
        } else {
            init(el, config);
        }
    },
    close: () => {
        const el = document.body as EL;
        if (el.instance) {
            el.instance.$.props.show = false;
        }
    },
};

export default VLoading;
