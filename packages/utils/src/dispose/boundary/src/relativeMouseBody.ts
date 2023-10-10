import { gsap } from "gsap";
import { UiTypes } from "@various/constants";
import { disposeSubAxis } from "../utils";

type RelativeMouseBodyEV = MouseEvent | { pageX: number; pageY: number };
type RelativeMouseBodyOption = {
    offsetX: number;
    offsetY: number;
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
    //* 数据初始化
    const result = { offsetX: 0, offsetY: 0 };

    //* X轴的位置计算
    const axisX = disposeSubAxis(
        { container: 0, space: 8, view: view.clientWidth },
        { min: scrollX, max: innerWidth + scrollX, align: option.align || "start", offset: ev.pageX }
    );

    if (axisX.align == "end") result.offsetX = axisX.offset - option.offsetX;
    else {
        result.offsetX = axisX.offset + option.offsetX;
    }

    //* Y轴的位置计算
    const axisY = disposeSubAxis(
        { container: 0, space: 8, view: view.clientHeight },
        { min: scrollY, max: innerHeight + scrollY, align: option.align || "start", offset: ev.pageY }
    );

    if (axisY.align == "end") result.offsetY = axisY.offset - option.offsetY;
    else {
        result.offsetY = axisY.offset + option.offsetY;
    }

    //* 未进行过定位时, 默认定位到当前位置
    if (view.style.opacity == "0") {
        gsap.set(view, { x: result.offsetX, y: result.offsetY });
    }

    //* 设置属性
    gsap.to(view, { duration: 0.2, x: result.offsetX, y: result.offsetY });
};
