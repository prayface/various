import { gsap } from "gsap";
import { UiTypes } from "@various/constants";
import { disposeSubAxis } from "../utils";

type RelativeMouseBodyEV = MouseEvent | { pageX: number; pageY: number };
type RelativeMouseBodyOption = {
    offsetX: number;
    offsetY: number;
    alignX?: UiTypes.align;
    alignY?: UiTypes.align;
    align?: UiTypes.align;
};

/**
 * @name 窗口相对于鼠标定位的可视区域边界算法
 * @param ev Mouse event对象
 * @param view 窗口
 * @param option
 * @returns
 */
export const relativeMouseBody = (ev: RelativeMouseBodyEV, view: HTMLElement, option: RelativeMouseBodyOption) => {
    //* X轴的位置计算
    const axisX = disposeSubAxis(
        { container: 0, space: option.offsetX, view: view.clientWidth },
        { min: scrollX, max: innerWidth + scrollX, align: option.alignX || option.align || "start", offset: ev.pageX }
    );

    //* Y轴的位置计算
    const axisY = disposeSubAxis(
        { container: 0, space: option.offsetY, view: view.clientHeight },
        { min: scrollY, max: innerHeight + scrollY, align: option.alignY || option.align || "start", offset: ev.pageY }
    );

    //* 未进行过定位时, 默认定位到当前位置
    if (view.style.opacity == "0") {
        gsap.set(view, { x: axisX.offset, y: axisY.offset });
    }

    //* 设置属性
    gsap.to(view, { duration: 0.2, x: axisX.offset, y: axisY.offset });
};
