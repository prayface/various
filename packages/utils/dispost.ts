const dispost = {
    //? 为指定盒子添加node, 若找不到该盒子则在body下新建一个
    boundary: (container: DOMRect, content: DOMRect, option: { direction: string; align: string }) => {
        switch (option.direction) {
            case "top": {
                //* 数据初始化
                const result = {
                    offsetX: dispostBoundaryAlign(option.align, container.left, content.width, container.width),
                    offsetY: container.top - 8,
                    transform: "translate(0, -100%)",
                };
                //* 超出边界处理
                if (result.offsetY - content.height < 0 && container.top + container.height + content.height + 8 < window.innerHeight) {
                    result.offsetY = container.top + container.height + 8;
                    result.transform = "none";
                }

                return result;
            }

            case "left": {
                //* 数据初始化
                const result = {
                    offsetX: container.left - 8,
                    offsetY: dispostBoundaryAlign(option.align, container.top, content.height, container.height),
                    transform: "translate(-100%, 0)",
                };
                //* 超出边界处理
                if (result.offsetX - content.width < 0 && container.left + container.width + content.width + 8 < window.innerWidth) {
                    result.offsetX = content.left + container.width + 8;
                    result.transform = "none";
                }

                return result;
            }

            case "right": {
                //* 数据初始化
                const result = {
                    offsetX: container.left + container.width + 8,
                    offsetY: dispostBoundaryAlign(option.align, container.top, content.height, container.height),
                    transform: "none",
                };
                //* 超出边界处理
                if (result.offsetX + content.width > window.innerWidth && container.left - container.width - 8 > 0) {
                    result.offsetX = container.left - 8;
                    result.transform = "translate(-100%, 0)";
                }

                return result;
            }

            case "bottom": {
                //* 数据初始化
                const result = {
                    offsetX: dispostBoundaryAlign(option.align, container.left, content.width, container.width),
                    offsetY: container.top + container.height + 8,
                    transform: "none",
                };
                //* 超出边界处理
                if (result.offsetY + content.height > window.innerHeight && container.top - container.height - 8 > 0) {
                    result.offsetY = container.top - 8;
                    result.transform = "translate(0, -100%)";
                }

                return result;
            }
        }
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

const dispostBoundaryAlign = (align: string, offset: number, content: number, container: number) => {
    const diff = content - container;
    switch (align) {
        case "center": {
            const offsetX = offset - diff / 2;
            if (offsetX + content > window.innerWidth && offset - diff > 0) {
                return offset - diff;
            } else if (offsetX < 0 && offset + content < window.innerWidth) {
                return offset;
            } else {
                return offsetX;
            }
        }

        case "bottom": {
            const offsetX = offset - diff;
            if (offsetX < 0 && offset + content < window.innerWidth) {
                return offset;
            } else {
                return offsetX;
            }
        }

        default: {
            if (offset + content > window.innerWidth && offset - diff > 0) {
                return offset - diff;
            } else {
                return offset;
            }
        }
    }
};

export default dispost;
