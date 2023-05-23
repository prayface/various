import { gsap } from "gsap";
import { UiTypes } from "@various/constants";
import { disposeLayshaft } from "../utils";

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
    const result = {
        offsetX: ev.pageX + option.offsetX,
        offsetY: ev.pageY + option.offsetY,
    };

    //* 副轴计算
    const layshaft = disposeLayshaft({
        size: 0,
        align: option.align || "start",
        offset: result.offsetY,
        min: window.scrollY,
        max: window.scrollY + window.innerHeight,
        viewSize: view.clientHeight,
    });

    //* 水平方向边界检测
    const offsetX = result.offsetX + view.offsetWidth;
    const offsetNewX = ev.pageX - view.offsetWidth - option.offsetX;
    if (offsetX > window.innerWidth + window.scrollX - 20 && offsetNewX >= window.scrollX + 20) {
        result.offsetX = offsetNewX;
    }

    //* 未进行过定位时, 默认定位到当前位置
    if (view.style.opacity == "0") {
        gsap.set(view, { x: result.offsetX, y: layshaft.offset });
    }

    gsap.to(view, { duration: 0.2, x: result.offsetX, y: layshaft.offset });

    return result;
};
