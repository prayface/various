import { DisposeLayshaftOption } from "./types";

//? 副轴方向边界处理
export const disposeLayshaft = (option: DisposeLayshaftOption) => {
    //* 计算容器与窗口的差值
    const difference = option.viewSize - option.size;

    //* 方向处理
    switch (option.align) {
        case "center": {
            //* 计算初始位置
            const result = {
                offset: option.offset - difference / 2,
                origin: "50%",
            };

            //* 检测左侧或者右侧超出边界
            if (result.offset + option.viewSize > option.max || result.offset < option.min) {
                //* 检测左对齐时, 右侧是否未超出边界
                if (option.offset + option.viewSize <= option.max) {
                    result.offset = option.offset;
                }

                //* 检测右对齐时, 左侧是否未超出边界
                if (option.offset - difference >= option.min) {
                    result.offset = option.offset - difference;
                }
            }

            return result;
        }

        case "start": {
            //* 计算初始位置
            const result = {
                offset: option.offset,
                origin: "0",
            };

            //* 检测是否左对齐时右侧超出边界并且右对齐时左侧是否在边界内
            if (result.offset + option.viewSize > option.max && option.offset - difference >= option.min) {
                result.offset = option.offset - difference;
            }

            return result;
        }

        case "end": {
            //* 计算初始位置
            const result = {
                offset: option.offset - difference,
                origin: "0",
            };

            //* 检测是否右对齐时左侧超出边界并且左对齐时右侧是否在边界内
            if (result.offset < option.min && option.offset + option.viewSize <= option.max) {
                result.offset = option.offset;
            }

            return result;
        }
    }
};
