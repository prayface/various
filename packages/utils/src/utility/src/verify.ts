export const isBoolean = (value: any): value is boolean => Object.prototype.toString.call(value) == "[object Boolean]";
export const isObject = (value: any): value is object => Object.prototype.toString.call(value) == "[object Object]";
export const isString = (value: any): value is string => typeof value == "string";
export const isNumber = (value: any): value is number => typeof value == "number";
export const isArray = (value: any): value is any[] => Array.isArray(value);
export const isDate = (value: any): value is Date => Object.prototype.toString.call(value) == "[object Date]";
