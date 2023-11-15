//* 函数库
import Maths from "mathjs";
import Lodash from "lodash";
//* 自定义函数
export * from "./src/random";
export * from "./src/objects";
//* 功能函数
export const upperFirst = Lodash.upperFirst;
export const cloneDeep = Lodash.cloneDeep;
//* 校验函数
export const isBoolean = Lodash.isBoolean;
export const isObject = Lodash.isObject;
export const isString = Lodash.isString;
export const isNumber = Lodash.isNumber;
export const isArray = Lodash.isArray;
export const isDate = Lodash.isDate;
//* 数学函数
export const multiply = Maths.multiply;
export const subtract = Maths.subtract;
export const divide = Maths.divide;
export const add = Maths.add;
