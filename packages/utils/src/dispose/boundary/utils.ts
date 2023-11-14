import type { UiTypes } from "@various/constants";
import type { DisposeNodeRectSize, DisposeSubRectOption, DisposeMainRectOption } from "./types";

import setting from "./setting";

//* 主轴的边界处理函数
export const disposeMainAxis = (size: DisposeNodeRectSize, option: DisposeMainRectOption) => {
    if (option.orientation > 0) {
        if (option.offset + size.view > option.max && option.offset - size.container - size.view - size.space * 2 >= option.min) {
            return { offset: option.offset - size.container - size.space * 2, exceed: true };
        }
    } else {
        if (option.offset - size.view < option.min && option.offset + size.container + size.view + size.space * 2 <= option.max) {
            return { offset: option.offset + size.container + size.space * 2, exceed: true };
        }
    }

    return { offset: option.offset, exceed: false };
};

//* 副轴的边界处理函数
export const disposeSubAxis = (size: DisposeNodeRectSize, option: DisposeSubRectOption) => {
    //* 数据初始化
    const result = { offset: option.offset + size.space, align: option.align };
    const difference = size.view - size.container;

    //* 减小最小最大位置的判定范围
    option.max -= 40;
    option.min += 40;

    //* 方向处理
    switch (option.align) {
        case "center": {
            //* 计算初始位置
            result.offset = option.offset - difference / 2;

            //* 检测左侧或者右侧超出边界
            if (result.offset + size.view > option.max && option.offset - difference >= option.min) {
                //* 检测右对齐时, 左侧是否未超出边界
                result.offset = option.offset - size.space - difference;
                result.align = "end";
            } else if (result.offset < option.min && option.offset + size.view <= option.max) {
                //* 检测左对齐时, 右侧是否未超出边界
                result.offset = option.offset + size.space;
                result.align = "start";
            }

            return result;
        }

        case "start": {
            //* 检测是否左对齐时右侧超出边界并且右对齐时左侧是否在边界内
            if (result.offset + size.view > option.max && option.offset - difference >= option.min) {
                result.offset = option.offset - size.space - difference;
                result.align = "end";
            }

            return result;
        }

        case "end": {
            //* 计算初始位置
            result.offset = option.offset - size.space - difference;

            //* 检测是否右对齐时左侧超出边界并且左对齐时右侧是否在边界内
            if (result.offset < option.min && option.offset + size.view <= option.max) {
                result.offset = option.offset + size.space;
                result.align = "start";
            }

            return result;
        }
    }
};

//* 窗口三角形属性设置
export const setTriangleAttr = (node: HTMLElement, direction: UiTypes.direction, align: UiTypes.align) => {
    //* 获取三角形属性
    const attrs: { [name: string]: string } = setting.triangle[`${direction}_${align}`];
    //* 遍历设置三角形属性
    for (const i in attrs) {
        node.style[i as any] = attrs[i];
    }
};
