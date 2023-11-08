<template>
    <div class="ui-table-layout" :style="receiveHeightStyle">
        <table class="ui-table-merge" :style="`--ui-table-border-width:${border}px; --ui-table-border-color:${borderColor}; `" ref="TableNode">
            <colgroup ref="ColgroupNode"></colgroup>
            <!-- * 表格头部区域 -->
            <thead class="ui-table-header" ref="HeaderNode">
                <!-- * 遍历生成表格列 -->
                <tr class="ui-table-row" v-for="row in headerData" :key="row.key">
                    <th v-for="header in row" :key="header.key" :rowspan="header.row || 1" :colspan="header.col || 1">
                        <div class="ui-table-column" :style="receiveAlignStyle(header)">
                            <!-- * 表格文本内容区域 -->
                            <span class="ui-table-context">
                                <slot :name="header.slot + 'Header'"> {{ header.name }}</slot>
                            </span>
                            <!-- * 表格排序控件 -->
                            <div class="ui-table-sort" v-if="header.sort" @click="changeSort(header)">
                                <div class="ui-table-sort-trigger" :class="classSortName(header, 'asc')"></div>
                                <div class="ui-table-sort-trigger ui-table-down-sort" :class="classSortName(header, 'desc')"></div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- * 遍历生成表格行 -->
            <tbody class="ui-table-bodys" ref="BodysNode">
                <template v-if="tableData && tableData.length">
                    <!-- * 表格行 -->
                    <tr class="ui-table-row" v-for="(row, rowIndex) in tableData" :class="classRowName({ row, rowIndex })">
                        <!-- * 遍历生成表格列 -->
                        <template v-for="(column, columnIndex) in tableOption">
                            <td
                                class="ui-table-column"
                                :name="column.key"
                                v-bind="mergeCells({ row, column, rowIndex, columnIndex })"
                                :style="receiveAlignStyle(column)">
                                <slot :name="column.slot" :data="row">
                                    <div class="ui-table-context" v-html="row[column.key]"></div>
                                </slot>
                            </td>
                        </template>
                    </tr>
                </template>
                <!-- * 无数据处理 -->
                <template v-else-if="noData">
                    <tr class="ui-table-row ui-table-error">
                        <td class="ui-table-row" :colspan="tableOption.length">{{ noData }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
//* 获取vue
import { onMounted, onUpdated, onBeforeUnmount } from "vue";

//* 配置项
import { UiTableMergePropsOption, UiTableMergeEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件配置项
defineOptions({ name: "UiTableMerge" });

const define = defineProps(UiTableMergePropsOption);
const emit = defineEmits(UiTableMergeEmits);

const { className, methods, styles, utils, refs } = useComposable(define, emit);
const { changeSort, mergeCells } = methods;
const { classSortName, classRowName } = className;
const { receiveHeightStyle, receiveAlignStyle } = styles;
const { TableNode, HeaderNode, BodysNode, headerData, tableOption, tableData } = refs;

//* resize observer声明
let observer: ResizeObserver;

//* 组件挂载
onMounted(() => {
    utils.init();

    //* 检测是否允许向下执行
    if (!refs.TableNode.value) return;
    else {
        //* 实例化ResizeObserver
        observer = new ResizeObserver(() => utils.computeWidth());
        //* 将main挂载到observer中
        observer.observe(refs.TableNode.value);
    }
});

//* 触发数据更新时, 进行一次初始化
onUpdated(() => {
    // utils.init();
});

//* 组件卸载进行observer移除
onBeforeUnmount(() => {
    observer.disconnect();
});

//* 导出函数
defineExpose({ changeSort: changeSort });
</script>
