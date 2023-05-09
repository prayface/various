/**
 * @name 窗口相对于鼠标定位的可视区域边界算法
 * @param ev Mouse event对象
 * @param view 窗口
 * @param option
 * @returns
 */
export const relativeMouseBody = (ev: MouseEvent, view: HTMLElement, option: { offsetX: number; offsetY: number }) => {
    const result = {
        offsetX: ev.pageX + option.offsetX,
        offsetY: ev.pageY + option.offsetY,
    };

    const offsetY = result.offsetY + view.offsetHeight;
    const offsetNewY = ev.pageY - view.offsetHeight - option.offsetY;
    if (offsetY > window.innerHeight + window.scrollY && offsetNewY >= window.scrollY) {
        result.offsetY = offsetNewY;
    }

    const offsetX = result.offsetX + view.offsetWidth;
    const offsetNewX = ev.pageX - view.offsetWidth - option.offsetX;
    if (offsetX > window.innerWidth + window.scrollX && offsetNewX >= window.scrollX) {
        result.offsetX = offsetNewX;
    }

    view.style.inset = `${result.offsetY}px auto auto ${result.offsetX}px`;

    return result;
};
