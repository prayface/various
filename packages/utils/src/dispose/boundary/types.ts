import { UiTypes } from "@various/constants";

/**@name 副轴边界处理配置项 */
export type DisposeLayshaftOption = {
    //* 副轴偏移位置
    offset: number;

    //* 副轴对齐反向
    align: UiTypes.align;

    //* 最小边界坐标
    min: number;

    //* 最大边界坐标
    max: number;

    //* 容器的尺寸
    size: number;

    //* 窗口尺寸
    viewSize: number;
};
