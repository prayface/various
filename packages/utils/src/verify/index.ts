export const isBoolean = (value: any) => Object.prototype.toString.call(value) === "[object Boolean]";
export const isObject = (value: any) => Object.prototype.toString.call(value) === "[object Object]";
export const isString = (value: any) => Object.prototype.toString.call(value) === "[object String]";
export const isNumber = (value: any) => Object.prototype.toString.call(value) === "[object Number]";
export const isArray = (value: any) => Object.prototype.toString.call(value) === "[object Array]";
