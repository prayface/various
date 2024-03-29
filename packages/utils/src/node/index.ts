//* 获取ID选择器选择的盒子, 若无则返回null
export const use = (selector: HTMLElement | string) => {
    //* 检测selector类型, string为容器ID, HTMLElement为HTML节点
    if (typeof selector == "string") {
        return document.querySelector(`#${selector}`);
    } else {
        return selector;
    }
};

//* 为指定盒子添加node, 若找不到该盒子则在body下新建一个
export const append = (selector: HTMLElement | string, el: Node) => {
    //* 初始化数据
    let container: HTMLElement | Element | null = use(selector);
    //* 检测是否存在该节点, 不存在则在body中插入节点
    if (!container) {
        container = document.createElement("div");
        container.id = selector as string;
        document.body.appendChild(container);
    } else {
        //* 检测node节点是否已存在
        for (let i = 0, l = container?.children?.length || 0; i < l; i++) {
            if (el && container?.children[i] == el) return;
        }
    }

    container.appendChild(el);
};

//* 为指定盒子删除node
export const remove = (selector: HTMLElement | string, el: Node) => {
    //* 初始化数据
    const container: HTMLElement | Element | null = use(selector);
    //* 检测该盒子子元素是否存在node, 存在则删除
    for (let i = 0, l = container?.children?.length || 0; i < l; i++) {
        if (el && container?.children[i] == el) {
            container.removeChild(el);
            break;
        }
    }
};

//* 检测当前节点是否在给定节点之中
export const includes = (current: HTMLElement | null, container: HTMLElement): boolean => {
    if (!current) return false;
    else if (current == container) {
        return true;
    } else {
        return includes(current.parentElement, container);
    }
};
