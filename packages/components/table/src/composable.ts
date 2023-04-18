import _ from "lodash";

import { computed } from "vue";
import { UiTableEmits, UiTableOption, UiTableProps } from "./table";
import { UiEmitFn } from "@various/constants";

export type UiTableConstructorRefs = {
    sort: "" | "asc" | "desc";
    ratio: any;
    sortKey: string;
    colgroup: { show: boolean; width: number }[];
};

export default class {
    refs;
    methods;
    computeds;

    constructor(refs: UiTableConstructorRefs, define: UiTableProps, emit: UiEmitFn<typeof UiTableEmits>) {
        this.refs = refs;
        this.methods = this.#methods(define, emit);
        this.computeds = this.#computeds(define);
    }

    #computeds(define: UiTableProps) {
        return {
            //? UiTable类名
            className: computed(() => {
                //* 数据初始化
                const result: string[] = [];

                //* 检测是否加载状态
                if (define.loading) result.push("ui-loading-status");

                return result.join(" ");
            }),

            //? UiTable样式
            style: computed(() => {
                //* 宽度处理
                if (!define.height) return {};
                else if (_.isNumber(define.height)) return { height: define.height + "px" };
                else return { height: define.height };
            }),
        };
    }

    #methods(define: UiTableProps, emit: UiEmitFn<typeof UiTableEmits>) {
        const sortDict = { asc: "desc", desc: "" };

        return {
            //* 切换排序状态
            cutSort: (data: UiTableOption) => {
                if (this.refs.sortKey == data.key && this.refs.sort) {
                    this.refs.sort = sortDict[this.refs.sort] as "desc" | "";
                } else {
                    this.refs.sortKey = data.key;
                    this.refs.sort = "asc";
                }

                emit("sort", this.refs.sortKey, this.refs.sort);
            },

            //* 切换单选状态
            cutRatio: (data: any) => {
                if (define.ratio && data[define.ratio]) {
                    this.refs.ratio = data[define.ratio];
                    emit("ratio", data);
                }
            },

            //* 获取Column的ClassName
            GetColumnClassName: (data: any) => {
                if (define.ratio && data[define.ratio] == this.refs.ratio) {
                    return "ui-active";
                } else {
                    return "";
                }
            },
        };
    }
}
