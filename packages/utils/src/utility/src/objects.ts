import { isObject } from "./verify";

export const objectPick = (data: { [name: string]: any }, handler: (value: any) => boolean, reserve?: string[]) => {
    if (!isObject(data)) return data;
    else {
        const result: { [name: string]: any } = {};
        for (const i in data) {
            if (result.hasOwnProperty(i) && (!reserve || !reserve.includes(i)) && handler(data[i])) {
                result[i] = data[i];
            }
        }

        return result;
    }
};
