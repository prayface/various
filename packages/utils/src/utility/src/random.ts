/**
 *
 * @param {number} [min=0] 最小值
 * @param {number} [max=1] 最大值
 * @param {boolean} [floating] 是否允许出现小数点
 */
export const random = (min?: number, max?: number, floating?: boolean) => {
    //* 初始化参数
    min = min || 0;
    max = max || 1;

    //* 检测max是否小于min, 小于则调换数值
    if (max < min) {
        let tmp = min;
        min = max;
        max = tmp;
    }

    //* 初始化返回值
    const result = min + (max - min) * Math.random();

    //* 检测是否需要取整
    if (floating) return result;
    else {
        const arr = result.toString().split(".");
        if (arr.length == 1) return result;
        else if (Number(arr.slice(-1)[0].charAt(0)) >= 5) {
            return Math.ceil(result)
        } else {
            return Math.floor(result)
        }
    }
};
