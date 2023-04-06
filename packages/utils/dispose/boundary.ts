//! 边界算法
interface BoundaryAlignConfig {
    offset: number;
    scroll: number;
    inner: number;
}

//? 相对于当前容器的边界算法配置项
export type elementToContainerBoundaryOption = {
    offsetMain: number; // 主轴偏移位置
    direction: "top" | "left" | "right" | "bottom";
    align: "end" | "start" | "center";
};

//? 副轴方向边界处理
const disposeBoundaryAlign = (align: string, container: number, main: number, config: BoundaryAlignConfig) => {
    const diff = container - main;
    switch (align) {
        case "center": {
            const offsetX = config.offset - diff / 2;
            if (offsetX + container > config.inner && config.offset - diff > config.scroll) {
                return config.offset - diff;
            } else if (offsetX < config.scroll && config.offset + container < config.inner) {
                return config.offset;
            } else {
                return offsetX;
            }
        }

        case "start": {
            if (config.offset + container > config.inner && config.offset - diff > config.scroll) {
                return config.offset - diff;
            } else {
                return config.offset;
            }
        }

        case "end": {
            const offsetX = config.offset - diff;
            if (offsetX < config.scroll && config.offset + container < config.inner) {
                return config.offset;
            } else {
                return offsetX;
            }
        }
    }
};

//? 计算不同副轴方向Origin的值
const disposeOriginAlign = (option: elementToContainerBoundaryOption) => {
    switch (option.align) {
        case "end":
            return "100%";
        case "start":
            return "0%";
        case "center":
            return "50%";
    }
};

//? 计算小三角对齐位置
const disposeTriangleAlign = (size: number, align: string) => {
    switch (align) {
        case "start": {
            return "8px";
        }
        case "center": {
            return `${size / 2 - 4}px`;
        }
        case "end": {
            return `${size - 16}px`;
        }
    }
};

//? 相对于当前容器的边界算法
export const elementToContainerBoundary = (container: HTMLElement, main: HTMLElement, option: elementToContainerBoundaryOption) => {
    const rect = elementToBodyRect(container);
    switch (option.direction) {
        case "top": {
            //* 数据初始化
            const result = {
                rotate: "90deg",
                offsetY: rect.top - main.offsetHeight - option.offsetMain,
                triangle: "auto",
                offsetX: disposeBoundaryAlign(option.align, main.offsetWidth, rect.width, {
                    offset: rect.left,
                    inner: window.innerWidth + window.scrollX,
                    scroll: window.scrollX,
                }),
            };

            //* 获取窗口偏移后左下角位置
            const offsetNewY = rect.top + rect.height + option.offsetMain + main.offsetHeight;

            //* 超出边界, 且另外一边存在足够位置时进行偏移, 否之原计划不变
            if (result.offsetY < window.scrollY && offsetNewY < window.innerHeight + window.scrollY) {
                //* 调整数据
                result.rotate = "-90deg";
                result.offsetY = rect.top + rect.height + option.offsetMain;
                result.triangle = `-6px auto auto ${disposeTriangleAlign(main.offsetWidth, option.align)}`;

                //* 样式调整
                main.style.transformOrigin = "center top";
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `${main.offsetHeight - 1}px auto auto ${disposeTriangleAlign(main.offsetWidth, option.align)}`;

                //* 样式调整
                main.style.transformOrigin = "center bottom";
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "bottom": {
            //* 数据初始化
            const result = {
                rotate: "-90deg",
                offsetY: rect.top + rect.height + option.offsetMain,
                triangle: "auto",
                offsetX: disposeBoundaryAlign(option.align, main.offsetWidth, rect.width, {
                    offset: rect.left,
                    inner: innerWidth,
                    scroll: window.scrollX,
                }),
            };

            //* 获取窗口偏移前左下角位置
            const offsetY = result.offsetY + main.offsetHeight;
            //* 获取窗口偏移后左上角位置
            const offsetNewY = rect.top - option.offsetMain - main.offsetHeight;

            //* 超出边界处理
            if (offsetY > window.innerHeight + window.scrollY && offsetNewY >= window.scrollY) {
                //* 调整数据
                result.rotate = "90deg";
                result.offsetY = rect.top - main.offsetHeight - option.offsetMain;
                result.triangle = `${main.offsetHeight - 1}px auto auto ${disposeTriangleAlign(main.offsetWidth, option.align)}`;

                //* 样式调整
                main.style.transformOrigin = "center bottom";
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `-6px auto auto ${disposeTriangleAlign(main.offsetWidth, option.align)}`;

                //* 样式调整
                main.style.transformOrigin = "center top";
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "left": {
            //* 数据初始化
            const result = {
                rotate: "",
                offsetX: rect.left - main.offsetWidth - option.offsetMain,
                triangle: "auto",
                offsetY: disposeBoundaryAlign(option.align, main.offsetHeight, rect.height, {
                    offset: rect.top,
                    inner: innerHeight,
                    scroll: window.scrollY,
                }),
            };

            //* 获取窗口偏移后右边位置
            const offsetNewX = rect.top + rect.width + option.offsetMain + main.offsetWidth;

            //* 超出边界处理
            if (result.offsetX < window.scrollX && offsetNewX <= window.innerWidth + window.scrollX) {
                //* 调整数据
                result.rotate = "180deg";
                result.offsetX = rect.left + rect.width + option.offsetMain;
                result.triangle = `${disposeTriangleAlign(main.offsetHeight, option.align)} auto auto -6px`;

                //* 样式调整
                main.style.transformOrigin = `left ${disposeOriginAlign(option)}`;
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `${disposeTriangleAlign(main.offsetHeight, option.align)} auto auto ${main.offsetWidth - 1}px`;

                //* 样式调整
                main.style.transformOrigin = `right ${disposeOriginAlign(option)}`;
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "right": {
            //* 数据初始化
            const result = {
                rotate: "180deg",
                offsetX: rect.left + rect.width + option.offsetMain,
                triangle: "auto",
                offsetY: disposeBoundaryAlign(option.align, main.offsetHeight, rect.height, {
                    offset: rect.top,
                    inner: innerHeight,
                    scroll: window.scrollY,
                }),
            };

            //* 获取窗口偏移前左边位置
            const offsetX = result.offsetX + main.offsetWidth;
            //* 获取窗口偏移后右边位置
            const offsetNewX = rect.top - option.offsetMain - main.offsetWidth;

            //* 超出边界处理
            if (offsetX > window.innerWidth + window.scrollX && offsetNewX >= window.scrollX) {
                //* 调整数据
                result.rotate = "";
                result.offsetX = rect.left - main.offsetWidth - option.offsetMain;
                result.triangle = `${disposeTriangleAlign(main.offsetHeight, option.align)} auto auto ${main.offsetWidth}px`;

                //* 样式调整
                main.style.transformOrigin = `right ${disposeOriginAlign(option)}`;
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 样式调整
                result.triangle = `${disposeTriangleAlign(main.offsetHeight, option.align)} auto auto -6px`;

                //* 样式调整
                main.style.transformOrigin = `left ${disposeOriginAlign(option)}`;
                main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }
    }
};

//? 相对于当前鼠标位置的边界算法
export const elementToMouseBoundary = (ev: MouseEvent, main: HTMLElement, option: { offsetX: number; offsetY: number }) => {
    const result = {
        offsetX: ev.pageX + window.scrollX + option.offsetX,
        offsetY: ev.pageY + window.scrollY + option.offsetY,
    };

    const offsetY = result.offsetY + main.offsetHeight;
    const offsetNewY = ev.pageY + window.scrollY - main.offsetHeight - option.offsetY;
    if (offsetY > window.innerHeight + window.scrollY && offsetNewY >= window.scrollY) {
        result.offsetY = offsetNewY;
    }

    const offsetX = result.offsetX + main.offsetWidth;
    const offsetNewX = ev.pageX + window.scrollX - main.offsetWidth - option.offsetX;
    if (offsetX > window.innerWidth + window.scrollX && offsetNewX >= window.scrollX) {
        result.offsetX = offsetNewX;
    }

    main.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;

    return result;
};

//? 获取Element到Body之间的距离
export const elementToBodyRect = (el: HTMLElement): DOMRect => {
    const rect = el.getBoundingClientRect();
    const offsetX = rect.left + window.scrollX;
    const offsetY = rect.top + window.scrollY;
    const result = {
        x: offsetX,
        y: offsetY,
        top: offsetY,
        left: offsetX,
        right: rect.right,
        width: rect.width,
        bottom: rect.bottom,
        height: rect.height,
    };

    return Object.assign(result, { toJSON: () => result });
};

//? 通过偏移、尺寸和范围计算边界处理
export const elementOptionBoundary = (offset: number, size: number, min: number, max: number) => {
    if (offset < min) return min;
    if (offset + size > max) return max - size;
    else return offset;
};
