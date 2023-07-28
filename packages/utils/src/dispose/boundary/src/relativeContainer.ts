import { UiTypes } from "@various/constants";

/**@name 相对于容器的边界算法的配置项 */
export type RelativeContainerOption = {
    //* 窗口偏移量
    offset: number;
    //* 窗口对齐方向
    align: UiTypes.align;
};

/**
 * @name 相对于容器的边界算法，也就是说窗口在容器内
 * @param size 容器的尺寸
 * @param viewSize 窗口的尺寸
 * @param option 配置项
 * @returns 返回窗口的起始位置
 */
export const relativeContainer = (size: number, viewSize: number, option: RelativeContainerOption) => {
    switch (option.align) {
        case "end":
            return size - viewSize - option.offset;

        case "start":
            return option.offset;

        case "center":
            return (size - viewSize) / 2;

        default:
            return 0;
    }
};
