//* Vue
import type { SetupContext, StyleValue } from "vue";
import { watch, ref, reactive, shallowRef, computed, nextTick } from "vue";
//* 动画库
import gsap from "gsap";
//* 公共函数
import { utility } from "@various/utils";
//* 组件属性
import { UiTableProps2, UiTableEmits2, UiTableOption2 } from "./component";
import type { UiTableVars } from "./types";

export const useComposable = (define: UiTableProps2, emits: SetupContext<typeof UiTableEmits2>["emit"]) => {
    //* 响应式变量
    const refs = {
        sorts: reactive({ key: "", value: "" }), //* 排序数据
        selects: ref<number[]>([]), //* 选择数据
        childrens: ref<number[]>([]), //* 嵌套数据
    };

    //* 节点
    const nodes = {
        head: ref<HTMLDivElement>(),
        main: ref<HTMLDivElement>(),
        bodys: ref<HTMLDivElement[]>([]),
        container: ref<HTMLDivElement>(),
    };

    //* 静态属性
    const variable = {
        size: 0,
        observer: shallowRef<ResizeObserver>(),
    };

    //* 计算属性
    const computeds = {
        size: computed(() => {
            if (!define.height) return {};
            else if (utility.isNumber(define.height)) {
                return { "max-height": define.height + "px" };
            } else {
                return { "max-height": define.height };
            }
        }),
    };

    //* 一次性函数
    const disposable = {
        //* 表格内容属性
        body: (data: any, index: number) => {
            if (refs.selects.value.includes(index) || refs.childrens.value.includes(index)) {
                return { class: "ui-active" };
            }

            return {};
        },

        //* 表头额外控件属性
        extra: (data: UiTableOption2) => {
            return {
                "align": "center" as "center",
                "trigger": "click" as "click",
                "direction": "bottom" as "bottom",
                "class-extra-name": data["extra-name"],
            };
        },

        //* 表格内容对齐属性
        align: (data: UiTableOption2): StyleValue => {
            switch (data.align) {
                case "singularity":
                    return { "justify-content": "center", "text-align": "left" };
                case "center":
                    return { "justify-content": "center", "text-align": "center" };
                case "right":
                    return { "justify-content": "flex-end", "text-align": "right" };
                default:
                    return { "justify-content": "flex-start", "text-align": "left" };
            }
        },
    };

    //* 函数列表
    const methods = {
        //* 初始化函数
        init: () => {
            //* 检测是否满足运行条件
            if (!nodes.container.value || !nodes.main.value || !nodes.head.value) return;
            else {
                //* 属性更新
                nodes.head.value.style.width = "";
                nodes.main.value.style.width = "";
            }

            //* 数据初始化
            const rows = [nodes.head.value, ...nodes.bodys.value];
            const vars: UiTableVars = {
                replenish: 0,
                size: Math.floor(nodes.head.value.clientWidth) - 4, //! 这里-4是预留宽度，用于解决因小数点计算导致的尺寸偏差
                data: [],
            };

            //* 容器宽度不足, 停止初始化
            if (vars.size <= 0) return;

            //* 第一次遍历进行数据初始化
            define.option.forEach((value) => {
                //* 数据初始化
                const result = {
                    key: value.key,
                    min: value["min-width"] || 0,
                    max: value["max-width"] || 0,
                    width: value.width || value["min-width"] || 0,
                    replenish: !value.width,
                };

                //* 遍历td、th用于获取row尺寸
                if (!value.width) {
                    rows.forEach((row) => {
                        //* 获取对应的col node
                        const node = row.querySelector(`.ui-table2-column[name=${value.key}]`) as HTMLElement;
                        const context = node.firstElementChild as HTMLElement;
                        //* 检测col node是否存在
                        if (!node) return;
                        else {
                            //* 重置node属性
                            node.style.whiteSpace = "nowrap";
                            node.style.width = "";
                            if (context) {
                                context.style.width = "";
                            }

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
                }

                //* 数据添加
                vars.data.push(result);
            });

            //* 统计实际表格所需尺寸
            const real = vars.data.reduce((former, current) => {
                return former + current.width;
            }, 0);

            //* 第二次遍历, 检测当前表格是需要进行补足还是删减尺寸, 并进行对应操作
            if (!define.overflow || (define.overflow && vars.size >= real)) {
                vars.replenish = vars.size - real;
                while (Math.floor(Math.abs(vars.replenish)) != 0) {
                    //* 初始化允许增减长度的数据列表
                    const data = vars.data.filter((val) => {
                        return val.replenish && (vars.replenish > 0 ? !val.max || val.width < val.max : !val.min || val.width > val.min);
                    });

                    //* 当不存在允许增减长度的数据列表时退出...
                    if (!data.length || vars.replenish / data.length == 0) break;

                    //* 增减尺寸...
                    if (vars.replenish > 0) {
                        //* 补充尺寸（平均分配）
                        const replenish = vars.replenish / data.length;
                        data.forEach((value) => {
                            if (value.max && value.width + replenish > value.max) {
                                vars.replenish -= value.max - value.width;
                                value.width = value.max;
                            } else {
                                value.width += replenish;
                                vars.replenish -= replenish;
                            }
                        });
                    } else if (vars.replenish < 0) {
                        //* 删减尺寸（优先删减最长的尺寸）
                        //* 获取data中最大的尺寸
                        const max = data.sort((a, b) => b.width - a.width)?.[0]?.width || 0;
                        for (let i = 0; i < data.length; i++) {
                            if (vars.replenish == 0) break;
                            if (data[i].width == max && data[i].width > data[i].min) {
                                //* 当width与min之间的距离小于1时：特殊处理
                                if (data[i].min && data[i].width - 1 < data[i].min) {
                                    vars.replenish += data[i].width - data[i].min;
                                    data[i].width = data[i].min;
                                } else {
                                    vars.replenish += 1;
                                    data[i].width -= 1;
                                }
                            }
                        }
                    }
                }
            } else {
                //* 数据初始化
                const size = real + Math.ceil(nodes.container.value.clientWidth - nodes.head.value.clientWidth) + 4;
                //* 属性更新
                nodes.head.value.style.width = size + "px";
                nodes.main.value.style.width = size + "px";
            }

            //* 第三次遍历设置定框的Row
            vars.data.forEach((value) => {
                //* 遍历td、th用于获取row尺寸
                rows.forEach((row) => {
                    //* 获取对应的col node
                    const node = row.querySelector(`.ui-table2-column[name=${value.key}]`) as HTMLElement;
                    //* 检测col node是否存在
                    if (!node) return;
                    else {
                        //* 设置尺寸
                        node.style.width = value.width + "px";
                    }
                });
            });

            //* 第四次遍历设置特殊对齐模式
            define.option
                .filter((value) => value.align == "singularity")
                .forEach((value) => {
                    //* 数据初始化
                    let result = 0;
                    //* 统计列宽度的最大值
                    nodes.bodys.value.forEach((row) => {
                        const node = row.querySelector(`.ui-table2-column[name=${value.key}] > .ui-table2-context`) as HTMLElement;
                        if (!node) return;
                        else {
                            result = Math.max(result, node.offsetWidth);
                        }
                    });

                    //* 设置列宽
                    nodes.bodys.value.forEach((row) => {
                        const node = row.querySelector(`.ui-table2-column[name=${value.key}] > .ui-table2-context`) as HTMLElement;
                        if (node && node.offsetWidth >= result) return;
                        else {
                            node.style.width = result + "px";
                        }
                    });
                });
        },

        //* 排序
        sort: (data?: UiTableOption2) => {
            if (!data) {
                refs.sorts.key = "";
                refs.sorts.value = "";
            } else {
                //* 排序算法
                if (refs.sorts.key != data.key) {
                    refs.sorts.key = data.key;
                    refs.sorts.value = "asc";
                } else {
                    if (refs.sorts.value == "asc") {
                        refs.sorts.value = "desc";
                    } else {
                        refs.sorts.key = "";
                        refs.sorts.value = "";
                    }
                }

                //* 响应排序事件
                emits("sort", refs.sorts);
            }
        },

        //* 单选
        radio: (index?: number) => {
            if (index == undefined) refs.selects.value = [];
            else {
                //* 数据更新
                refs.selects.value = [index];
                //* 事件响应
                emits("radio", define.data[index]);
            }
        },

        //* 选择
        select: (index: number) => {
            if (define.selector == "checkbox") methods.checkbox(index);
            else if (define.selector == "children") methods.children(index);
            else if (define.selector == "radio") {
                methods.radio(index);
            }
        },

        //* 多选
        checkbox: (index?: number) => {
            if (index == undefined) refs.selects.value = [];
            else {
                //* 数据更新
                const key = refs.selects.value.findIndex((value) => value == index);
                if (key != -1) {
                    refs.selects.value.splice(key, 1);
                } else {
                    refs.selects.value.push(index);
                }

                //* 返回结果初始化
                const result = refs.selects.value.map((index) => define.data[index]);
                //* 事件响应
                emits("checkbox", result);
            }
        },

        //* 嵌套
        children: (index?: number) => {
            if (index == undefined) refs.childrens.value = [];
            else {
                //* 数据更新
                const key = refs.childrens.value.findIndex((value) => value == index);
                if (key != -1) {
                    refs.childrens.value.splice(key, 1);
                } else {
                    refs.childrens.value.push(index);
                }
            }
        },
    };

    //* 侦听器
    const watchs = {
        watch_stop: watch(
            () => define.data,
            () => {
                //* 清空选择和嵌套数据
                refs.selects.value = [];
                refs.childrens.value = [];
                //* 初始化表格
                nextTick(() => methods.init());
            }
        ),
    };

    //* 响应事件
    const ons = {
        animation: {
            //* 动画（入场前）
            "before-enter": (el: Element) => gsap.set(el, { height: 0, opacity: 0 }),
            //* 动画（离场）
            "leave": (el: Element, onComplete: () => void) => gsap.to(el, { height: 0, opacity: 0, duration: 0.2, onComplete: onComplete }),
            //* 动画（入场）
            "enter": (el: Element, onComplete: () => void) => gsap.to(el, { height: "auto", opacity: 1, duration: 0.2, onComplete: onComplete }),
        },
    };

    return { ons, refs, nodes, watchs, methods, variable, computeds, disposable };
};
