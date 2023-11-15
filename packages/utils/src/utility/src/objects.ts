import _ from "lodash";

/**
 * @name object选择器
 * @param {object} [data] 数据
 * @param {function} [handler] 选择逻辑事件
 * @param {string[]} [reserve=[]] 排除
 */
export const objectPick = (data: { [name: string]: any }, handler: (value: any) => boolean, reserve?: string[]) => {
    if (!_.isObject(data)) return data;
    else {
        const result: { [name: string]: any } = {};
        for (const i in data) {
            if (data.hasOwnProperty(i) && (!reserve || !reserve.includes(i)) && handler(data[i])) {
                result[i] = data[i];
            }
        }

        return result;
    }
};
