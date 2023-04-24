<template>
    <div class="ui-table" :class="className" :style="style" ref="main">
        <!-- 表格头部区域 -->
        <div class="ui-table-header">
            <!-- 表格主体 -->
            <table class="ui-table-container">
                <colgroup>
                    <col v-for="value in colgroup" :width="value.width" />
                </colgroup>
                <thead>
                    <tr>
                        <!-- 动态渲染的表格结构 -->
                        <th class="ui-table-column" v-for="row in option" :key="row.key" :class="row.className">
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

                        <!-- 滚动条占位坑 -->
                        <th class="ui-table-column ui-table-scrollbar-column"></th>
                    </tr>
                </thead>
            </table>
        </div>

        <!-- 表格内容区域 -->
        <div class="ui-table-body" ref="body">
            <!-- 表格Body区域的容器, 用于处理spacing属性带来的上下间距 -->
            <div class="ui-table-body-container" ref="bodyContainer">
                <!-- 表格主体 -->
                <table class="ui-table-container">
                    <colgroup>
                        <template v-for="value in colgroup">
                            <col :width="value.width" v-if="value.show" />
                        </template>
                    </colgroup>
                    <tbody>
                        <!-- 动态渲染的表格结构 -->
                        <tr v-for="(col, index) in data" :key="index" :class="GetColumnClassName(col)" @click="cutRatio(col)">
                            <td class="ui-table-column" v-for="row in option" :key="row.key" :class="row.className">
                                <slot :name="row.slot" :data="col">{{ col[row.key] }}</slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { UiTableEmits, UiTablePropsOption } from "./table";

import Composable, { UiTableConstructorRefs } from "./composable";

export default defineComponent({
    name: "UiTable",
    emits: UiTableEmits,
    props: UiTablePropsOption,
    setup(define, { emit }) {
        // 数据初始化
        const main = ref<HTMLDivElement>();
        const body = ref<HTMLDivElement>();
        const bodyContainer = ref<HTMLDivElement>();
        const refs = reactive<UiTableConstructorRefs>({
            sort: "",
            ratio: undefined,
            sortKey: "",
            colgroup: [],
        });

        // 实例化组合函数
        const composable = new Composable(refs, define, emit);

        //  组件挂载时添加resize observer监听表格尺寸变化, 用于进行单元格尺寸调整
        onMounted(() => {
            if (main.value) {
                // 实例化ResizeObserver
                const observer = new ResizeObserver(() => {
                    if (!main.value || !body.value || !bodyContainer.value) return;

                    //* 数据初始化
                    refs.colgroup = [{ show: false, width: define.spacing }];

                    //* 统计未分配的尺寸
                    let unallocated = main.value.clientWidth - define.spacing * 2 - 2; //* 已分配尺寸
                    let unallocatedCount = 0; //* 未分配份额数量
                    define.option.forEach((config) => {
                        unallocated -= config.width || 0;
                        refs.colgroup.push({ show: true, width: config.width || 0 });
                        if (!config.width) {
                            unallocatedCount += config.flex || 1;
                        }
                    });

                    //* 判断是否出现滚动条
                    if (body.value.clientHeight < bodyContainer.value.clientHeight) {
                        unallocated -= 12;
                        refs.colgroup.push({ show: false, width: define.spacing + 12 });
                    } else {
                        refs.colgroup.push({ show: false, width: define.spacing });
                    }

                    //* 统计每份份额宽度占比(向下取整)
                    const share = Math.floor(unallocated / unallocatedCount);

                    //* 遍历为所有按份额分配模块补充宽度
                    refs.colgroup.forEach((value, index, arr) => {
                        if (!value.width) {
                            arr[index].width = share;
                        }
                    });

                    //* 随机为第一个份额补充剩余尺寸
                    if (refs.colgroup[1]) {
                        refs.colgroup[1].width += unallocated - unallocatedCount * share;
                    }
                });

                // 将main挂载到observer中
                observer.observe(main.value);
            }
        });

        return {
            main,
            body,
            bodyContainer,
            ...toRefs(refs),
            ...composable.methods,
            ...composable.computeds,
        };
    },
});
</script>
