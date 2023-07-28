import { SetupContext, computed, ref } from "vue";
import { UiTableProps, UiTableEmits, UiTableOption } from "../index";
import type { UiTableVars } from "./types";
import { verify } from "@various/utils";

export const useComposable = (define: UiTableProps, emit: SetupContext<typeof UiTableEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        //* 排序配置
        sortKey: ref<string>(""),
        sortValue: ref<string>(""),

        //* 单选配置
        ratioValue: ref<string>(),

        //* 嵌套表格开启列表
        childrens: ref<string[]>([]),

        //* 表格行节点
        HeaderNode: ref<HTMLDivElement>(),
        TableNode: ref<HTMLDivElement>(),
        BodysNode: ref<HTMLDivElement>(),
    };

    //* 工具函数
    const utils = {
        //* 表格初始化函数
        init: () => {
            //* 检测是否满足运行条件
            if (!refs.TableNode.value || !refs.HeaderNode.value || !refs.BodysNode.value) return;

            //* 数据初始化
            const bodys = refs.BodysNode.value.querySelectorAll(".ui-table-body") || [];
            const offsetTop = refs.BodysNode.value.scrollTop;
            const rows = [refs.HeaderNode.value, ...bodys];
            const vars: UiTableVars = {
                replenish: 0,
                size: refs.TableNode.value.offsetWidth - 14 - define.spacing * 2,
                data: [],
            };

            //* 第一次遍历进行数据初始化
            define.option.forEach((value) => {
                //* 数据初始化
                const result = {
                    key: value.key,
                    min: value["min-width"] || 0,
                    max: value["max-width"] || 0,
                    width: value.width || value["min-width"] || 0,
                };

                //* 遍历td、th用于获取row尺寸
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
                            if (result.max && node.clientWidth > result.max) {
                                result.width = result.max;
                            } else {
                                result.width = Math.ceil(node.clientWidth) + 4;
                            }
                        }

                        //* 回退样式调整
                        node.style.whiteSpace = "";
                    }
                });

                //* 数据添加
                vars.data.push(result);
            });

            //* 统计实际表格所需尺寸
            const real = vars.data.reduce((former, current) => {
                return former + current.width;
            }, 0);

            //* 第二次遍历, 检测当前表格是需要进行补足还是删减尺寸, 并进行对应操作
            if (real < vars.size) {
                //* 统计当前需补充的长度
                const replenish = (vars.size - real) / vars.data.length;
                vars.data.forEach((val) => {
                    val.width += replenish;
                });
            } else if (real > vars.size) {
                //* 统计当前需删减的长度
                let omit = real - vars.size;
                //* 无限循环删减omit
                while (omit > 0) {
                    const data = vars.data.filter((val) => val.width > val.min);
                    const max = data.sort((a, b) => b.width - a.width)?.[0]?.width || 0;
                    if (!data.length) return;
                    else {
                        for (let i = 0; i < data.length; i++) {
                            if (omit <= 0) break;
                            if (data[i].width == max) {
                                omit--;
                                data[i].width--;
                            }
                        }
                    }
                }
            }

            //* 第三次遍历设置定框的Row
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

            //* 出现滚动条需要表头需要补充间距
            if (refs.BodysNode.value.scrollHeight > refs.BodysNode.value.offsetHeight) {
                refs.HeaderNode.value.style.paddingRight = `${define.spacing + 12}px`;
            }

            //* 滚动条定位
            refs.BodysNode.value.scrollTo({ top: offsetTop });
        },
    };

    //* 样式列表
    const styles = {
        //* 内间距
        receiveRowStyle: computed(() => {
            return {
                padding: `0 ${define.spacing}px`,
            };
        }),

        //* bodys样式
        receiveBodysStyle: computed(() => {
            if (!define.height) return {};
            else if (verify.isNumber(define.height)) {
                return { height: define.height + "px" };
            } else {
                return { height: define.height };
            }
        }),

        //* 对齐样式
        receiveAlignStyle: (data: any) => {
            switch (data.align) {
                case "center":
                    return { "justify-content": "center" };

                case "right":
                    return { "justify-content": "flex-end" };

                default:
                    return { "justify-content": "flex-start" };
            }
        },
    };

    //* 状态列表
    const states = {
        //* 获取嵌套表格状态
        disposeChild: (data: any) => {
            if (define.children && define.childrenIndex && refs.childrens.value.includes(data[define.childrenIndex])) {
                return true;
            } else {
                return false;
            }
        },

        //* 获取嵌套表格图标显示状态
        disposeChildIcon: (data: any) => {
            if (define.children && define.childrenIndex && data.key == define.childrenIndex) {
                return true;
            } else {
                return false;
            }
        },
    };

    //* 函数列表
    const methods = {
        //* 切换排序
        changeSort: (data: UiTableOption) => {
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

        //* 切换单选
        changeRatio: (data: any) => {
            if (define.ratio && define.ratioIndex && refs.ratioValue.value != data[define.ratioIndex]) {
                //* 变量修改
                refs.ratioValue.value = data[define.ratioIndex];

                //* 响应单选事件
                emit("ratio", data);
            }
        },

        //* 开关函数
        switchChild: (data: any) => {
            //* 数据初始化
            const key = define.childrenIndex || "";
            const index = refs.childrens.value.findIndex((value: any) => {
                return value == data[key];
            });

            //* 判断开启或关闭
            if (index == -1) {
                refs.childrens.value.push(data[key]);
            } else {
                refs.childrens.value.splice(index, 1);
            }
        },
    };

    //* 类名列表
    const className = {
        //* 获取排序状态类名
        classSortName: (data: UiTableOption, value: string) => {
            if (refs.sortKey.value == data.key && refs.sortValue.value == value) {
                return "ui-active";
            } else {
                return "";
            }
        },

        //* 获取单选状态类名
        classRatioName: (data: any) => {
            if (define.ratio && define.ratioIndex && refs.ratioValue.value == data[define.ratioIndex]) {
                return "ui-active";
            } else {
                return "";
            }
        },

        //* 获取body下column类名
        classBodyColumnName: (data: any) => {
            const result: string[] = [];
            if (states.disposeChildIcon(data)) result.push("ui-table-children-column");
            if (data.className) result.push(data.className);

            return result;
        },

        //* 获取body下column子集的类名
        classColumnChildName: (data: any) => {
            return { "ui-active": states.disposeChild(data) };
        },
    };

    return { refs, utils, styles, states, methods, className };
};
