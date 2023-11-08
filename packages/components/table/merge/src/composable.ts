import { SetupContext, computed, ref, nextTick } from "vue";
import { UiTableMergeProps, UiTableMergeEmits, UiTableMergeOption } from "../index";
import type { UiTableVars } from "./types";
import { utility } from "@various/utils";

export const useComposable = (define: UiTableMergeProps, emit: SetupContext<typeof UiTableMergeEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        //* 排序配置
        sortKey: ref<string>(""),
        sortValue: ref<string>(""),

        //* 表格行节点
        HeaderNode: ref<HTMLDivElement>(),
        TableNode: ref<HTMLDivElement>(),
        BodysNode: ref<HTMLDivElement>(),
        ColgroupNode: ref<HTMLDivElement>(),

        tableOption: ref<any[]>([]), //* 表格配置项
        headerData: ref<any[]>([]),
        tableData: ref<any[]>(define.data),

    };

    //* 工具函数
    const utils = {
        //* 计算表头行数
        getHeaderRows: (obj: any) => {
            let result = 1;
            const count = (row: any, level: number) => {
                result = level;

                row.forEach((val: any) => {
                    if (val.children) {
                        count(val.children, level++);
                    }
                });
            };
            count(obj, 1);
            return result;
        },
        //* 表头合并属性
        getHeaderData: (data: any, row: number) => {
            return { ...data, row: data.children ? 1 : row, col: data.children?.length || 1 }
        },
        //* 表格初始化函数
        init: () => {
            //* 检测是否满足运行条件
            if (!refs.TableNode.value || !refs.HeaderNode.value || !refs.BodysNode.value) return;

            //* 表头行数
            const headerRows = utils.getHeaderRows(define.option);

            //* 第一次遍历 进行表头数据和表格配置项初始化
            let headerDataResult: object[][] = [[], []];
            let tableOptionResult: UiTableMergeOption[] = [];
            define.option.forEach((value: any) => {
                headerDataResult[0].push(utils.getHeaderData(value, headerRows))
                if (value.children) {
                    value.children.forEach((val: any) => {
                        headerDataResult[1].push(utils.getHeaderData(val, 1))
                        tableOptionResult.push(val);
                    })
                } else {
                    tableOptionResult.push(value);
                }
            })
            refs.headerData.value = utility.cloneDeep(headerDataResult);
            refs.tableOption.value = utility.cloneDeep(tableOptionResult);

            nextTick(() => {
                utils.computeWidth();
            })

        },
        //* 计算列宽
        computeWidth: () => {
            //* 检测是否满足运行条件
            if (!refs.TableNode.value || !refs.HeaderNode.value || !refs.BodysNode.value) return;

            //* 数据初始化
            const headers = refs.HeaderNode.value.querySelectorAll(".ui-table-row") || [];
            const bodys = refs.BodysNode.value.querySelectorAll(".ui-table-row") || [];
            const offsetTop = refs.BodysNode.value.scrollTop;
            const rows = [...headers, ...bodys];
            const vars: UiTableVars = {
                replenish: 0,
                size: Math.floor(refs.TableNode.value.clientWidth) - 4, //! 这里-4是预留宽度，用于解决因小数点计算导致的尺寸偏差
                data: [],
            };

            //* 第一次遍历进行数据初始化
            refs.tableOption.value.forEach((value) => {
                //* 数据初始化
                const result = {
                    key: value.key,
                    min: value["min-width"] || -1,
                    max: value["max-width"] || -1,
                    width: value.width || value["min-width"] || 0,
                    replenish: !value.width,
                };

                //* 遍历td、th用于获取row尺寸
                if (!value.width) {
                    rows.forEach((row) => {
                        //* 获取对应的col node
                        const node = row.querySelector(`.ui-table-column[name=${value.key}]`) as HTMLElement;
                        //* 检测col node是否存在
                        if (!node) return;
                        else {
                            //* 重置node属性
                            node.style.whiteSpace = "nowrap";
                            node.style.width = "";

                            //* 判断当前尺寸是否为最大尺寸
                            if (node.clientWidth > result.width) {
                                if (result.max != -1 && node.clientWidth > result.max) {
                                    result.width = result.max;
                                } else {
                                    result.width = Math.ceil(node.clientWidth) + 4;
                                }
                            }

                            //* 回退样式调整
                            node.style.whiteSpace = "";
                        }
                    });
                }

                //* 数据添加
                vars.data.push(result);
            });


            //* 第二次遍历设置定框的Row
            vars.data.forEach((value) => {
                //* 遍历td、th用于获取row尺寸
                rows.forEach((row) => {
                    //* 获取对应的col node
                    const node = row.querySelector(`.ui-table-column[name=${value.key}]`) as HTMLElement;

                    //* 检测col node是否存在
                    if (!node) return;
                    else {
                        //* 设置尺寸
                        node.style.width = `${value.width}px`;
                    }
                });
            });


            //* 滚动条定位
            refs.BodysNode.value.scrollTo({ top: offsetTop });
        }

    };

    //* 样式列表
    const styles = {

        //* 高度
        receiveHeightStyle: computed(() => {
            if (!define.height) return {};
            else if (utility.isNumber(define.height)) {
                return { height: define.height + "px" };
            } else {
                return { height: define.height };
            }
        }),

        //* 对齐样式
        receiveAlignStyle: (data: any): { [name: string]: string } => {
            switch (data.align) {
                case "center":
                    return { "justify-content": "center", "text-align": "center" };

                case "end":
                    return { "justify-content": "flex-end", "text-align": "right" };

                default:
                    return { "justify-content": "flex-start", "text-align": "left" };
            }
        },
    };


    //* 函数列表
    const methods = {
        //* 切换排序
        changeSort: (data: UiTableMergeOption) => {
            //* 切换已排序字段时的处理, 其余都为切换未排序字段
            if (refs.sortKey.value == data.key) {
                //* 排序为升序时, 切换为降序, 其余都为取消排序
                if (refs.sortValue.value == "asc") {
                    refs.sortValue.value = "desc";
                } else {
                    refs.sortKey.value = "";
                    refs.sortValue.value = "";
                }
            } else {
                refs.sortKey.value = data.key;
                refs.sortValue.value = "asc";
            }

            //* 响应排序事件
            emit("sort", refs.sortKey.value, refs.sortValue.value);
        },

        //* 合并单元格
        mergeCells: ({ row, column, rowIndex, columnIndex }: { row: object, column: object, rowIndex: number, columnIndex: number }) => {
            let result = {}
            emit("merge", { row, column, rowIndex, columnIndex }, (res: any) => result = res)
            return result
        },

    };

    //* 类名列表
    const className = {
        //* 获取排序状态类名
        classSortName: (data: UiTableMergeOption, value: string) => {
            if (refs.sortKey.value == data.key && refs.sortValue.value == value) {
                return "ui-active";
            } else {
                return "";
            }
        },

        //* 行类名
        classRowName: ({ row, rowIndex }: { row: object, rowIndex: number }) => {
            let result = {}
            emit("rowClass", { row, rowIndex }, (res: any) => result = res)

            return result
        },
    };

    return { refs, utils, styles, methods, className };
};
