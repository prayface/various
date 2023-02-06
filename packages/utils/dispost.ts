interface BoundaryAlignConfig {
    offset: number;
    scroll: number;
    inner: number;
}

const dispost = {
    //? 相对于当前容器的边界算法
    elementToContainerBoundary: (main: DOMRect, container: DOMRect, option: { direction: string; align: string }) => {
        const innerWidth = window.innerWidth + window.scrollX;
        const innerHeight = window.innerHeight + window.scrollY;
        switch (option.direction) {
            case "top": {
                //* 数据初始化
                const result = {
                    rotate: "90deg",
                    offsetX: dispostBoundaryAlign(option.align, container.width, main.width, { offset: main.left, inner: innerWidth, scroll: window.scrollX }),
                    offsetY: main.top - 8,
                    triangle: `${container.height - 1}px auto auto ${dispostTriangleAlign(container.width, option.align)}`,
                    transform: "translate(0, -100%)",
                };
                //* 超出边界处理
                if (result.offsetY - container.height < window.scrollY && main.top + main.height + container.height + 8 < innerHeight) {
                    result.rotate = "-90deg";
                    result.offsetY = main.top + main.height + 8;
                    result.triangle = `-6px auto auto ${dispostTriangleAlign(container.width, option.align)}`;
                    result.transform = "none";
                }

                return result;
            }

            case "left": {
                //* 数据初始化
                const result = {
                    rotate: "",
                    offsetX: main.left - 8,
                    offsetY: dispostBoundaryAlign(option.align, container.height, main.height, { offset: main.top, inner: innerHeight, scroll: window.scrollY }),
                    triangle: `${dispostTriangleAlign(container.height, option.align)} auto auto ${container.width}px`,
                    transform: "translate(-100%, 0)",
                };
                //* 超出边界处理
                if (result.offsetX - container.width < window.scrollX && main.left + main.width + container.width + 8 < innerWidth) {
                    result.rotate = "180deg";
                    result.offsetX = main.left + main.width + 8;
                    result.triangle = `${dispostTriangleAlign(container.height, option.align)} auto auto -6px`;
                    result.transform = "none";
                }

                return result;
            }

            case "right": {
                //* 数据初始化
                const result = {
                    rotate: "180deg",
                    offsetX: main.left + main.width + 8,
                    offsetY: dispostBoundaryAlign(option.align, container.height, main.height, { offset: main.top, inner: innerHeight, scroll: window.scrollY }),
                    triangle: `${dispostTriangleAlign(container.height, option.align)} auto auto -6px`,
                    transform: "none",
                };
                //* 超出边界处理
                if (result.offsetX + container.width > innerWidth && main.left - main.width - 8 > window.scrollX) {
                    result.rotate = "";
                    result.offsetX = main.left - 8;
                    result.triangle = `${dispostTriangleAlign(container.height, option.align)} auto auto ${container.width}px`;
                    result.transform = "translate(-100%, 0)";
                }

                return result;
            }

            case "bottom": {
                //* 数据初始化
                const result = {
                    rotate: "-90deg",
                    offsetX: dispostBoundaryAlign(option.align, container.width, main.width, { offset: main.left, inner: innerWidth, scroll: window.scrollX }),
                    offsetY: main.top + main.height + 8,
                    triangle: `-6px auto auto ${dispostTriangleAlign(container.width, option.align)}`,
                    transform: "none",
                };
                //* 超出边界处理
                if (result.offsetY + container.height > innerHeight && main.top - main.height - 8 > window.scrollY) {
                    result.rotate = "90deg";
                    result.offsetY = main.top - 8;
                    result.triangle = `${container.height - 1}px auto auto ${dispostTriangleAlign(container.width, option.align)}`;
                    result.transform = "translate(0, -100%)";
                }

                return result;
            }
        }
    },

    //? 相对于当前鼠标位置的边界算法
    elementToMouseBoundary: (ev: MouseEvent, container: DOMRect, option: { offsetX: number; offsetY: number }) => {
        const translate = { x: "", y: "" };
        const innerWidth = window.innerWidth + window.scrollX;
        const innerHeight = window.innerHeight + window.scrollY;
        //* 数据初始化
        const result = {
            offsetX: ev.pageX + option.offsetX,
            offsetY: ev.pageY + option.offsetY,
            transform: "none",
        };
        //* X轴超出边界处理
        if (result.offsetX + container.width > innerWidth && ev.pageX - container.width - option.offsetX > window.scrollX) {
            result.offsetX = ev.pageX - option.offsetX;
            translate.x = "-100%";
        }
        //* Y轴超出边界处理
        if (result.offsetY + container.height > innerHeight && ev.pageY - container.height - option.offsetY > window.scrollY) {
            result.offsetY = ev.pageY - option.offsetY;
            translate.y = "-100%";
        }

        if (translate.x || translate.y) {
            result.transform = `translate(${translate.x}, ${translate.y})`;
        }

        return result;
    },

    //? 获取Element到Body之间的距离
    elementToBodyRect: (el: HTMLElement): DOMRect => {
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
    },
};

const dispostBoundaryAlign = (align: string, container: number, main: number, config: BoundaryAlignConfig) => {
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

        case "bottom": {
            const offsetX = config.offset - diff;
            if (offsetX < config.scroll && config.offset + container < config.inner) {
                return config.offset;
            } else {
                return offsetX;
            }
        }

        default: {
            if (config.offset + container > config.inner && config.offset - diff > config.scroll) {
                return config.offset - diff;
            } else {
                return config.offset;
            }
        }
    }
};

const dispostTriangleAlign = (size: number, align: string) => {
    switch (align) {
        case "top": {
            return "8px";
        }
        case "center": {
            return `${size / 2 - 4}px`;
        }
        case "bottom": {
            return `${size - 16}px`;
        }
    }
};

export default dispost;
