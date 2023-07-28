import { UiTypes } from "@various/constants";
import { useElementOption } from "./useElementOption";
import { disposeLayshaft } from "../utils";
import { relativeContainer } from "./relativeContainer";

/**@name 窗口相对于容器定位的可视区域边界算法的配置项 */
export type RelativeContainerBodyOption = {
    //* 主轴偏移位置
    offset: number;

    //* 主轴方向
    direction: UiTypes.direction;

    //* 副轴对齐方式
    align: UiTypes.align;

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
export const relativeContainerBody = (container: HTMLElement, view: HTMLElement, option: RelativeContainerBodyOption) => {
    //* 获取容器位置参数
    const rect = useElementOption(container);

    //* 获取窗口宽高
    const viewWidth = Math.ceil(option.width || view.offsetWidth);
    const viewHeight = Math.ceil(option.height || view.offsetHeight);

    //* 设置窗口宽度
    view.style.width = viewWidth + "px";
    view.style.maxHeight = viewHeight + "px";

    switch (option.direction) {
        case "top": {
            //* 副轴计算
            const layshaft = disposeLayshaft({
                align: option.align,
                size: rect.width,
                offset: rect.rootX,
                min: window.scrollX,
                max: window.scrollX + window.innerWidth,
                viewSize: viewWidth,
            });

            //* 数据初始化
            const result = {
                rotate: "90deg",
                offsetY: rect.rootY - viewHeight - option.offset,
                triangle: "auto",
                offsetX: layshaft.offset,
            };

            //* 获取窗口偏移后左下角位置
            const offsetNewY = rect.rootY + rect.height + option.offset + viewHeight;
            //* 获取小三角偏移位置
            const triangleOffset = relativeContainer(viewWidth, 8, { align: option.align, offset: 8 });

            //* 超出边界, 且另外一边存在足够位置时进行偏移, 否之原计划不变
            if (result.offsetY < window.scrollY && offsetNewY < window.innerHeight + window.scrollY) {
                //* 调整数据
                result.rotate = "-90deg";
                result.offsetY = rect.rootY + rect.height + option.offset;
                result.triangle = `-6px auto auto ${triangleOffset}px`;

                //* 样式调整
                view.style.transformOrigin = "center top";
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `${viewHeight - 1}px auto auto ${triangleOffset}px`;

                //* 样式调整
                view.style.transformOrigin = "center bottom";
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "bottom": {
            //* 副轴计算
            const layshaft = disposeLayshaft({
                align: option.align,
                size: rect.width,
                offset: rect.rootX,
                min: window.scrollX,
                max: window.scrollX + window.innerWidth,
                viewSize: viewWidth,
            });

            //* 数据初始化
            const result = {
                rotate: "-90deg",
                offsetY: rect.rootY + rect.height + option.offset,
                triangle: "auto",
                offsetX: layshaft.offset,
            };

            //* 获取窗口偏移前左下角位置
            const offsetY = result.offsetY + viewHeight;
            //* 获取窗口偏移后左上角位置
            const offsetNewY = rect.rootY - option.offset - viewHeight;
            //* 获取小三角偏移位置
            const triangleOffset = relativeContainer(viewWidth, 8, { align: option.align, offset: 8 });

            //* 超出边界处理
            if (offsetY > window.innerHeight + window.scrollY && offsetNewY >= window.scrollY) {
                //* 调整数据
                result.rotate = "90deg";
                result.offsetY = rect.rootY - viewHeight - option.offset;
                result.triangle = `${viewHeight - 1}px auto auto ${triangleOffset}px`;

                //* 样式调整
                view.style.transformOrigin = "center bottom";
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `-6px auto auto ${triangleOffset}px`;

                //* 样式调整
                view.style.transformOrigin = "center top";
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "left": {
            //* 副轴计算
            const layshaft = disposeLayshaft({
                align: option.align,
                size: rect.height,
                offset: rect.rootY,
                min: window.scrollY,
                max: window.scrollY + window.innerHeight,
                viewSize: viewHeight,
            });

            //* 数据初始化
            const result = {
                rotate: "",
                offsetX: rect.rootX - viewWidth - option.offset,
                triangle: "auto",
                offsetY: layshaft.offset,
            };

            //* 获取窗口偏移后右边位置
            const offsetNewX = rect.rootY + rect.width + option.offset + viewWidth;
            //* 获取小三角偏移位置
            const triangleOffset = relativeContainer(viewHeight, 8, { align: option.align, offset: 8 });

            //* 超出边界处理
            if (result.offsetX < window.scrollX && offsetNewX <= window.innerWidth + window.scrollX) {
                //* 调整数据
                result.rotate = "180deg";
                result.offsetX = rect.rootX + rect.width + option.offset;
                result.triangle = `${triangleOffset}px auto auto -6px`;

                //* 样式调整
                view.style.transformOrigin = `left ${layshaft.origin}`;
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 调整数据
                result.triangle = `${triangleOffset}px auto auto ${viewWidth - 1}px`;

                //* 样式调整
                view.style.transformOrigin = `right ${layshaft.origin}`;
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }

        case "right": {
            //* 副轴计算
            const layshaft = disposeLayshaft({
                align: option.align,
                size: rect.height,
                offset: rect.rootY,
                min: window.scrollY,
                max: window.scrollY + window.innerHeight,
                viewSize: viewHeight,
            });

            //* 数据初始化
            const result = {
                rotate: "180deg",
                offsetX: rect.rootX + rect.width + option.offset,
                triangle: "auto",
                offsetY: layshaft.offset,
            };

            //* 获取窗口偏移前左边位置
            const offsetX = result.offsetX + viewWidth;
            //* 获取窗口偏移后右边位置
            const offsetNewX = rect.rootY - option.offset - viewWidth;
            //* 获取小三角偏移位置
            const triangleOffset = relativeContainer(viewHeight, 8, { align: option.align, offset: 8 });

            //* 超出边界处理
            if (offsetX > window.innerWidth + window.scrollX && offsetNewX >= window.scrollX) {
                //* 调整数据
                result.rotate = "";
                result.offsetX = rect.rootX - viewWidth - option.offset;
                result.triangle = `${triangleOffset}px auto auto ${viewWidth}px`;

                //* 样式调整
                view.style.transformOrigin = `right ${layshaft.origin}`;
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            } else {
                //* 样式调整
                result.triangle = `${triangleOffset}px auto auto -6px`;

                //* 样式调整
                view.style.transformOrigin = `left ${layshaft.origin}`;
                view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;
            }

            return result;
        }
    }
};
