<template>
    <div class="ui-table" ref="TableNode">
        <!-- * 表格头部区域 -->
        <div class="ui-table-header" ref="HeaderNode" :style="receiveRowStyle">
            <!-- * 遍历生成表格列 -->
            <div class="ui-table-column" v-for="row in option" :key="row.key" :name="row.key" :style="receiveAlignStyle(row)">
                <!-- * 表格文本内容区域 -->
                <span class="ui-table-context">
                    <slot :name="row.slot + 'Header'">{{ row.name }}</slot>
                </span>

                <!-- * 表格排序控件 -->
                <div class="ui-table-sort" v-if="row.sort" @click="changeSort(row)">
                    <div class="ui-table-sort-trigger" :class="classSortName(row, 'asc')"></div>
                    <div class="ui-table-sort-trigger ui-table-down-sort" :class="classSortName(row, 'desc')"></div>
                </div>
            </div>
        </div>

        <!-- * 表格内容区域 -->
        <div class="ui-table-bodys" ref="BodysNode" :style="receiveBodysStyle">
            <!-- * 遍历生成表格行 -->
            <template v-if="data && data.length">
                <template v-for="value in data">
                    <div class="ui-table-body" :class="classRatioName(value)" :style="receiveRowStyle" @click="changeRatio(value)">
                        <!-- * 表格行 -->
                        <div class="ui-table-row">
                            <!-- * 遍历生成表格列 -->
                            <template v-for="row in option">
                                <div class="ui-table-column" :class="classBodyColumnName(row)" :name="row.key" :style="receiveAlignStyle(row)">
                                    <div class="ui-table-context">
                                        <!-- * 表格文本内容区域 -->
                                        <slot :name="row.slot" :data="value">{{ value[row.key] }}</slot>

                                        <!-- * 表格图标 -->
                                        <template v-if="disposeChildIcon(row)">
                                            <span class="ui-table-icon" :class="classColumnChildName(value)" @click="switchChild(value)"></span>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- * 嵌套表格 -->
                        <div class="ui-table-children" v-if="disposeChild(value)">
                            <slot name="children" :data="value"></slot>
                        </div>
                    </div>
                </template>
            </template>

            <!-- * 无数据处理 -->
            <template v-else-if="noData">
                <div class="ui-table-body ui-table-error">
                    <div class="ui-table-row">{{ noData }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 获取vue
import { onMounted, onUpdated, onBeforeUnmount } from "vue";

//* 配置项
import { UiTablePropsOption, UiTableEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件配置项
defineOptions({ name: "UiTable" });

const define = defineProps(UiTablePropsOption);
const emit = defineEmits(UiTableEmits);

const { className, methods, states, styles, utils, refs } = useComposable(define, emit);
const { switchChild, changeSort, changeRatio } = methods;
const { disposeChild, disposeChildIcon } = states;
const { classSortName, classRatioName, classBodyColumnName, classColumnChildName } = className;
const { receiveRowStyle, receiveBodysStyle, receiveAlignStyle } = styles;
const { BodysNode, TableNode, HeaderNode } = refs;

//* resize observer声明
let observer: ResizeObserver;

//* 组件挂载时添加resize observer监听表格尺寸变化, 用于进行单元格尺寸调整
onMounted(() => {
    //* 检测是否允许向下执行
    if (!refs.TableNode.value) return;
    else {
        //* 实例化ResizeObserver
        observer = new ResizeObserver(() => utils.init());

        //* 将main挂载到observer中
        observer.observe(refs.TableNode.value);
    }
});

//* 触发数据更新时, 进行一次初始化
onUpdated(() => {
    utils.init();
});

//* 组件卸载进行observer移除
onBeforeUnmount(() => {
    observer.disconnect();
});

//* 导出函数
defineExpose({ switchChild: switchChild, changeRatio: changeRatio, changeSort: changeSort });
</script>
