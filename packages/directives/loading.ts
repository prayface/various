import { register } from "../utils";

interface Directive {
    name: string;
    timer: NodeJS.Timer | null;
    mounted: (el: any, res: any) => any;
    updated: (el: any, res: any) => any;
    unmounted: (el: any) => any;
}

const directive: Directive = {
    name: "loading",
    timer: null,
    mounted: (el: any, res: any) => append(el, res.value),
    updated: (el: any, res: any) => {
        if (res.value) {
            return append(el, res.value);
        } else {
            return remove(el);
        }
    },
    unmounted: (el: any) => remove(el),
};

const append = (el: any, show: boolean, className?: string) => {
    if (!el.querySelector(".ui-mask") && show) {
        //* 初始化数据
        const dom = document.createElement("div");
        const classList = ["ui-mask v-enter-from"];
        //* 添加额外类名
        className && classList.push(className);
        //* 添加class与html
        dom.className = classList.join(" ");
        dom.innerHTML = `
                <svg class="ui-icon ui-mash-icon">
                    <use xlink:href="#icon-loading"></use>
                </svg>
            `;

        el.style.position = "relative";
        el.style.overflow = "hidden";
        el.append(dom);

        directive.timer && clearTimeout(directive.timer);
        directive.timer = setTimeout(() => {
            dom.classList.add("v-enter-to");
            dom.classList.remove("v-enter-from");
            directive.timer = null;
        }, 0);
    }
};

const remove = (el: any) => {
    const dom = el.querySelector(".ui-mask");
    if (dom) {
        dom.classList.remove("v-enter-to");
        dom.classList.add("v-leave-to");
        directive.timer && clearTimeout(directive.timer);
        directive.timer = setTimeout(() => {
            el.removeChild(dom);
            el.style.overflow = "";
            el.style.position = "";
            directive.timer = null;
        }, 200);
    }
};

export const VLoading = register.use(directive, "directive");
export const $loading = {
    open: () => append(document.body, true, "ui-global-mask"),
    close: () => remove(document.body),
};
