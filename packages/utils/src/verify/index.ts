export const isBoolean = (value: any) => Object.prototype.toString.call(value) == "[object Boolean]";
export const isObject = (value: any) => Object.prototype.toString.call(value) == "[object Object]";
export const isString = (value: any) => typeof value == "string";
export const isNumber = (value: any) => typeof value == "number";
export const isArray = (value: any) => Array.isArray(value);
export const isDate = (value: any) => Object.prototype.toString.call(value) == "[object Date]";
