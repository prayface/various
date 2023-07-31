import { isObject, isArray, isDate } from "./verify";

export const cloneDeep = (value: any) => {
    //* Date类型, 返回一个新的Date类型
    if (isDate(value)) {
        const date = new Date();
        date.setTime(value.getTime());
        return date;
    }

    //* Array类型, 递归拷贝每一个值
    if (isArray(value)) {
        const result: any[] = [];
        value?.forEach((val: any) => {
            result.push(cloneDeep(val));
        });

        return result;
    }

    //* Object类型, 递归拷贝每一个值
    if (isObject(value)) {
        const result: { [name: string]: any } = {};
        for (const i in value) {
            if (value?.hasOwnProperty(i)) {
                result[i] = cloneDeep(value[i]);
            }
        }

        return result;
    }

    return value;
};
