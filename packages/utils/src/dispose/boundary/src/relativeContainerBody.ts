import { UiTypes } from "@various/constants";
import { useElementOption } from "./useElementOption";
import { disposeMainAxis, disposeSubAxis, setTriangleAttr } from "../utils";

/**@name 窗口相对于容器定位的可视区域边界算法的节点 */
export type RelativeContainerBodyNodes = {
    container: HTMLElement; //* 相对的容器节点
    triangle?: HTMLElement; //* 窗口上方的三角形节点
    view: HTMLElement; //* 窗口节点
};

/**@name 窗口相对于容器定位的可视区域边界算法的配置项 */
export type RelativeContainerBodyOption = {
    //* 副轴对齐方式
    align: UiTypes.align;

    //* 主轴偏移位置
    offset: number;

    //* 主轴方向
    direction: UiTypes.direction;

    //* 窗口宽度
    width?: number;

    //* 窗口高度
    height?: number;
};

/**
 * @name 窗口相对于容器定位的可视区域边界算法
 * @param container 容器
 * @param view 窗口
 * @param option
 * @returns
 */
export const relativeContainerBody = (nodes: RelativeContainerBodyNodes, option: RelativeContainerBodyOption) => {
    //* 获取容器位置参数
    const rect = useElementOption(nodes.container);

    //* 获取窗口宽高
    const viewWidth = Math.ceil(option.width || nodes.view.offsetWidth);
    const viewHeight = Math.ceil(option.height || nodes.view.offsetHeight);

    //* 窗口尺寸调整
    if (option.width) nodes.view.style.width = viewWidth + "px";
    if (option.height) nodes.view.style.maxHeight = viewHeight + "px";

    switch (option.direction) {
        case "top": {
            //* 计算主轴位置
            const mainAxis = disposeMainAxis(
                { container: rect.height, space: option.offset, view: viewHeight },
                { min: scrollY, max: innerHeight + scrollY, offset: rect.rootY - option.offset, orientation: -1 }
            );

            //* 计算副轴位置
            const subAxis = disposeSubAxis(
                { container: rect.width, space: 8, view: viewWidth },
                { min: scrollX, max: innerWidth + scrollX, align: option.align, offset: rect.rootX }
            );

            //* 设置属性
            nodes.view.style.top = `${mainAxis.offset}px`;
            nodes.view.style.left = `auto`;
            nodes.view.style.right = `auto`;
            nodes.view.style.bottom = `${subAxis.offset}px`;
            nodes.triangle && setTriangleAttr(nodes.triangle, mainAxis.exceed ? "bottom" : "top", subAxis.align);

            //* 边界处理（未超出）
            if (!mainAxis.exceed) {
                nodes.view.style.transform = "translateY(-100%)";
            }

            //* 退出
            break;
        }

        case "left": {
            //* 计算主轴位置
            const mainAxis = disposeMainAxis(
                { container: rect.width, space: option.offset, view: viewWidth },
                { min: scrollX, max: innerWidth + scrollX, offset: rect.rootX - option.offset, orientation: -1 }
            );

            //* 计算副轴位置
            const subAxis = disposeSubAxis(
                { container: rect.height, space: 8, view: viewHeight },
                { min: scrollY, max: innerHeight + scrollY, align: option.align, offset: rect.rootY }
            );

            //* 设置属性
            nodes.view.style.top = `${subAxis.offset}px`;
            nodes.view.style.left = `${mainAxis.offset}px`;
            nodes.view.style.right = `auto`;
            nodes.view.style.bottom = `auto`;
            nodes.triangle && setTriangleAttr(nodes.triangle, mainAxis.exceed ? "right" : "left", subAxis.align);

            //* 边界处理（未超出）
            if (!mainAxis.exceed) {
                nodes.view.style.transform = "translateX(-100%)";
            }

            //* 退出
            break;
        }

        case "right": {
            //* 计算主轴位置
            const mainAxis = disposeMainAxis(
                { container: rect.width, space: option.offset, view: viewWidth },
                { min: scrollX, max: innerWidth + scrollX, offset: rect.rootX + rect.width + option.offset, orientation: 1 }
            );

            //* 计算副轴位置
            const subAxis = disposeSubAxis(
                { container: rect.height, space: 8, view: viewHeight },
                { min: scrollY, max: innerHeight + scrollY, align: option.align, offset: rect.rootY }
            );

            //* 设置属性
            nodes.view.style.top = `${subAxis.offset}px`;
            nodes.view.style.left = `${mainAxis.offset}px`;
            nodes.view.style.right = `auto`;
            nodes.view.style.bottom = `auto`;
            nodes.triangle && setTriangleAttr(nodes.triangle, mainAxis.exceed ? "left" : "right", subAxis.align);

            //* 边界处理（未超出）
            if (mainAxis.exceed) {
                nodes.view.style.transform = "translateX(-100%)";
            }

            //* 退出
            break;
        }

        case "bottom": {
            //* 计算主轴位置
            const mainAxis = disposeMainAxis(
                { container: rect.height, space: option.offset, view: viewHeight },
                { min: scrollY, max: innerHeight + scrollY, offset: rect.rootY + rect.height + option.offset, orientation: 1 }
            );

            //* 计算副轴位置
            const subAxis = disposeSubAxis(
                { container: rect.width, space: 8, view: viewWidth },
                { min: scrollX, max: innerWidth + scrollX, align: option.align, offset: rect.rootX }
            );

            //* 设置属性
            nodes.view.style.top = `${mainAxis.offset}px`;
            nodes.view.style.left = `${subAxis.offset}px`;
            nodes.view.style.right = `auto`;
            nodes.view.style.bottom = `auto`;
            nodes.triangle && setTriangleAttr(nodes.triangle, mainAxis.exceed ? "top" : "bottom", subAxis.align);

            //* 边界处理（超出）
            if (mainAxis.exceed) {
                nodes.view.style.transform = "translateY(-100%)";
            }

            //* 退出
            break;
        }
    }
};
