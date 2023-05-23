<template>
    <div class="ui-table" :class="className" :style="style" ref="main">
        <!-- 表格头部区域 -->
        <div class="ui-table-header">
            <!-- 表格主体 -->
            <table class="ui-table-container" ref="header">
                <colgroup>
                    <!-- 表格开头间隔 -->
                    <col :width="spacing + 'px'" />
                    <!-- 表格每一项尺寸 -->
                    <col v-for="row in option" ref="colsHeader" :key="row.key" :name="row.key" />
                    <!-- 表格结尾间隔 -->
                    <col ref="colHeaderFinish" :width="spacing + 'px'" />
                </colgroup>
                <thead>
                    <tr>
                        <!-- 占位坑 -->
                        <th class="ui-table-column ui-table-placeholder-column"></th>

                        <!-- 动态渲染的表格结构 -->
                        <th class="ui-table-column" v-for="row in option" :key="row.key" :name="row.key" :class="row.className">
                            <span class="ui-table-column-content">
                                <!-- 内容 -->
                                <slot :name="row.slot + 'Header'" :data="row">{{ row.name }}</slot>

                                <!-- 控制器 -->
                                <div class="ui-table-controls">
                                    <!-- 排序 -->
                                    <template v-if="row.sort">
                                        <div class="ui-table-sort" @click="cutSort(row)">
                                            <div class="ui-table-sort-up" :class="{ 'ui-active': sortKey == row.key && sort == 'asc' }"></div>
                                            <div class="ui-table-sort-down" :class="{ 'ui-active': sortKey == row.key && sort == 'desc' }"></div>
                                        </div>
                                    </template>
                                </div>
                            </span>
                        </th>

                        <!-- 占位坑 -->
                        <th class="ui-table-column ui-table-placeholder-column"></th>
                    </tr>
                </thead>
            </table>
        </div>

        <!-- 表格内容区域 -->
        <div class="ui-table-body" ref="container">
            <!-- 表格Body区域的容器, 用于处理spacing属性带来的上下间距 -->
            <div class="ui-table-body-container" ref="body">
                <!-- 表格主体 -->
                <table class="ui-table-container">
                    <colgroup>
                        <!-- 表格开头间隔 -->
                        <col :width="spacing + 'px'" />
                        <!-- 表格每一项尺寸 -->
                        <col v-for="row in option" ref="colsBody" :key="row.key" :name="row.key" />
                        <!-- 表格结尾间隔 -->
                        <col ref="colBodyFinish" :width="spacing + 'px'" />
                    </colgroup>
                    <tbody>
                        <tr v-for="(col, index) in data" :key="index" :class="GetColumnClassName(col)" @click="cutRatio(col)">
                            <!-- 占位坑 -->
                            <td class="ui-table-column ui-table-placeholder-column"></td>

                            <!-- 动态渲染的表格结构 -->
                            <td class="ui-table-column" v-for="row in option" :key="row.key" :name="row.key" :class="row.className">
                                <slot :name="row.slot" :data="col">{{ col[row.key] }}</slot>
                            </td>

                            <!-- 占位坑 -->
                            <td class="ui-table-column ui-table-placeholder-column"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated } from "vue";
import { UiTableEmits, UiTablePropsOption } from "./table";
import { UiTableVars } from "./types";

import Composable from "./composable";

export default defineComponent({
    name: "UiTable",
    emits: UiTableEmits,
    props: UiTablePropsOption,
    setup(define, { emit }) {
        // 实例化组合函数
        const { refs, methods, computeds } = Composable(define, emit);

        // 表格初始化算法
        const init = () => {
            // 检测是否满足运行条件
            if (!refs.colHeaderFinish.value || !refs.colBodyFinish.value || !refs.container.value || !refs.header.value || !refs.body.value) return;

            // 将占位格的尺寸拉到最大, 用于获取表格中Col的最小宽度
            refs.colHeaderFinish.value.style.width = `${refs.body.value.offsetWidth}px`;
            refs.colBodyFinish.value.style.width = `${refs.body.value.offsetWidth}px`;

            // 数据初始化
            const rows = [...refs.body.value.querySelectorAll("tr"), ...refs.header.value.querySelectorAll("tr")];
            const vars: UiTableVars = {
                replenish: 0,
                size: refs.body.value.offsetWidth - define.spacing * 2,
                data: [],
            };

            // 第一次遍历进行数据初始化
            define.option.forEach((value) => {
                // 数据初始化
                const result = {
                    key: value.key,
                    min: value["min-width"] || 0,
                    max: value["max-width"] || 0,
                    width: value.width || value["min-width"] || 0,
                    replenish: value.replenish || 0,
                };

                // 统计补足的份额
                vars.replenish += result.replenish;

                // 遍历td、th用于获取row尺寸
                rows.forEach((row) => {
                    // 获取对应的col node
                    const node = row.querySelector(`td[name=${value.key}],th[name=${value.key}]`) as HTMLElement;
                    // 检测col node是否存在
                    if (!node) return;
                    else {
                        // 设置node文本换行属性
                        node.style.whiteSpace = "nowrap";
                        // 判断当前尺寸是否为最大尺寸
                        if (node.clientWidth > result.width) {
                            if (result.max && node.clientWidth > result.max) {
                                result.width = result.max;
                            } else {
                                result.width = Math.ceil(node.clientWidth);
                            }
                        }
                        // 回退样式调整
                        node.style.whiteSpace = "";
                    }
                });

                // 数据添加
                vars.data.push(result);
            });

            // 统计实际表格所需尺寸
            const real = vars.data.reduce((former, current) => {
                return former + current.width;
            }, 0);

            // 第三次遍历, 检测当前表格是需要进行补足还是删减尺寸, 并进行对应操作
            if (real < vars.size) {
                if (vars.replenish > 0) {
                    const replenish = (vars.size - real) / vars.replenish;
                    vars.data.forEach((val) => {
                        if (val.replenish) val.width += replenish * val.replenish;
                    });
                } else {
                    const replenish = (vars.size - real) / vars.data.length;
                    vars.data.forEach((val) => {
                        val.width += replenish;
                    });
                }
            } else if (real > vars.size) {
                // 统计当前需删减的长度
                let omit = real - vars.size;
                // 无限循环删减omit
                while (omit > 0) {
                    const data = vars.data.filter((val) => val.width > val.min);
                    const max = data.sort((a, b) => b.width - a.width)?.[0].width || 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].width == max) {
                            omit--;
                            data[i].width--;
                        }

                        if (omit == 0) break;
                    }
                }
            }

            // // 第四次遍历设置定框的Row
            vars.data.forEach((row) => {
                // 设置Header Row宽度
                const colHeader = refs.colsHeader.value.find((value) => value.getAttribute("name") == row.key);
                if (colHeader) {
                    colHeader.style.width = row.width + "px";
                }
                // 设置Body Row宽度
                const colBody = refs.colsBody.value.find((value) => value.getAttribute("name") == row.key);
                if (colBody) {
                    colBody.style.width = row.width + "px";
                }
            });

            // 回调占位格尺寸
            refs.colHeaderFinish.value.style.width = `${define.spacing}px`;
            if (refs.container.value.scrollHeight > refs.container.value.offsetHeight) {
                refs.colBodyFinish.value.style.width = `${define.spacing - 12}px`;
            } else {
                refs.colBodyFinish.value.style.width = `${define.spacing}px`;
            }
        };

        // 组件挂载时添加resize observer监听表格尺寸变化, 用于进行单元格尺寸调整
        onMounted(() => {
            // 检测是否允许向下执行
            if (!refs.main.value) return;
            // 实例化ResizeObserver
            const observer = new ResizeObserver(() => init());

            // 将main挂载到observer中
            observer.observe(refs.main.value);
        });

        // 触发数据更新时, 进行一次初始化
        onUpdated(() => init());

        return {
            ...refs,
            ...methods,
            ...computeds,
        };
    },
});
</script>
