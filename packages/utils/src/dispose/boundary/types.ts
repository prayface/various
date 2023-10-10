import { UiTypes } from "@various/constants";

export interface DisposeNodeRectSize {
    view: number;
    space: number;
    container: number;
}

export interface DisposeMainRectOption {
    min: number;
    max: number;
    offset: number;
    orientation: 1 | -1; //* Top | Left 传 -1; Right | Bottom 传 1
}

export interface DisposeSubRectOption {
    min: number;
    max: number;
    align: UiTypes.align;
    offset: number;
}
