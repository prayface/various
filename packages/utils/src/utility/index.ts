//* 函数库
import _ from "lodash";
//* 自定义函数
export * from "./src/random";
export * from "./src/objects";
//* 功能函数
export const upperFirst = _.upperFirst;
export const cloneDeep = _.cloneDeep;
//* 校验函数
export const isBoolean = _.isBoolean;
export const isObject = _.isObject;
export const isString = _.isString;
export const isNumber = _.isNumber;
export const isArray = _.isArray;
export const isDate = _.isDate;
//* 数学函数
export const multiply = _.multiply;
export const subtract = _.subtract;
export const divide = _.divide;
export const add = _.add;
