import _ from "lodash";

import { computed, ref } from "vue";
import { UiTableEmits, UiTableOption, UiTableProps } from "./table";
import { UiEmitFn } from "@various/constants";

export default (define: UiTableProps, emit: UiEmitFn<typeof UiTableEmits>) => {
    //* 响应式变量
    const refs = {
        //* HTML Node
        main: ref<HTMLDivElement>(),
        body: ref<HTMLTableElement>(),
        header: ref<HTMLTableElement>(),
        colsBody: ref<HTMLTableColElement[]>([]),
        container: ref<HTMLDivElement>(),
        colsHeader: ref<HTMLTableColElement[]>([]),
        colBodyFinish: ref<HTMLTableColElement>(),
        colHeaderFinish: ref<HTMLTableColElement>(),

        //* 排序字段
        sort: ref<string>(""),
        sortKey: ref<string>(""),

        //* 单选字段
        ratio: ref<string>(""),
    };

    //* 计算属性
    const computeds = {
        //* UiTable类名
        className: computed(() => {
            //* 数据初始化
            const result: string[] = [];
            //* 检测是否加载状态
            if (define.loading) result.push("ui-loading-status");
            return result.join(" ");
        }),

        //* UiTable样式
        style: computed(() => {
            //* 宽度处理
            if (!define.height) return {};
            else if (_.isNumber(define.height)) return { height: define.height + "px" };
            else return { height: define.height };
        }),
    };

    //* 函数
    const methods = {
        //* 切换排序状态
        cutSort: (data: UiTableOption) => {
            //* 切换已排序字段时的处理, 其余都为切换未排序字段
            if (refs.sortKey.value == data.key) {
                //* 排序为升序时, 切换为降序, 其余都为取消排序
                if (refs.sort.value == "asc") {
                    refs.sort.value = "desc";
                } else {
                    refs.sort.value = "";
                    refs.sortKey.value = "";
                }
            } else {
                refs.sort.value = "asc";
                refs.sortKey.value = data.key;
            }

            //* 响应sort事件
            emit("sort", refs.sortKey.value, refs.sort.value);
        },

        //* 切换单选状态
        cutRatio: (data: any) => {
            if (define.ratio && data[define.ratio]) {
                refs.ratio.value = data[define.ratio];
                emit("ratio", data);
            }
        },

        //* 获取Column的ClassName
        GetColumnClassName: (data: any) => {
            if (define.ratio && data[define.ratio] == refs.ratio.value) {
                return "ui-active";
            } else {
                return "";
            }
        },
    };

    return { computeds, methods, refs };
};
