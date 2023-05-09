/**
 * @name 获取Element的配置项
 * @param {Element} el Element noe
 * @returns 返回Element距页面左上角、可视区域左上角距离和Element尺寸
 */
export const useElementOption = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return {
        rootY: rect.top + window.scrollY,
        rootX: rect.left + window.scrollX,
        visibleY: rect.top,
        visibleX: rect.left,
        width: rect.width,
        height: rect.height,
    };
};
