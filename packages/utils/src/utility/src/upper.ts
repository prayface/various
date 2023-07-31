import { isString } from "./verify";

/**
 * @name 将字符串首字母转大写
 * @param {string} str
 * @returns string
 */
export const upperFirst = (str: string) => {
    if (isString(str)) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    const strText = str as any;
    if (strText.toString) {
        const result = strText.toString();
        return result.slice(0, 1).toUpperCase() + result.slice(1);
    }

    return str;
};
