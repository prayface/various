//! 配置解析算法
import { isBoolean } from "../verify";
import { UiTypes } from "@various/constants";

//? Loading配置解析
export const analysisLoadingOption = (option: UiTypes.loading) => {
    if (isBoolean(option)) {
        return { is: option, context: "" };
    } else {
        return { is: option.is, context: option.context };
    }
};
