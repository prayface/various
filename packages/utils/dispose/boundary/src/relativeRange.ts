/**
 * @name 相对于范围的边界算法，也就是说窗口在范围内
 * @param {number} site 当前窗口的起始坐标
 * @param {number} size 当前窗口的尺寸
 * @param {{min: number, max: number}} option { min: 范围最小坐标, max: 范围最大坐标 }
 * @returns 返回窗口的起始位置
 */
export const relativeRange = (site: number, size: number, option: { min: number; max: number }) => {
    if (site < option.min) return option.min;
    if (site + size > option.max) return option.max - size;
    else return site;
};
