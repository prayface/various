<template>
    <div class="ui-table">
        <!-- * 表格头部区域 -->
        <div class="ui-table-header">
            <!-- * 遍历生成表格列 -->
            <div class="ui-table-column" v-for="row in option" :key="row.key">
                <!-- * 表格文本内容区域 -->
                <span class="ui-table-context">
                    <slot :name="row.slot + 'Header'">{{ row.name }}</slot>
                </span>

                <!-- * 表格排序控件 -->
                <div class="ui-table-sort" v-if="row.sort" @click="changeSort(row)">
                    <div class="ui-table-sort-trigger" :class="receiveSort(row, 'asc')"></div>
                    <div class="ui-table-sort-trigger ui-table-down-sort" :class="receiveSort(row, 'desc')"></div>
                </div>
            </div>
        </div>

        <!-- * 表格内容区域 -->
        <div class="ui-table-bodys">
            <!-- * 遍历生成表格行 -->
            <template v-for="col in data">
                <div class="ui-table-body" :class="receiveRatio(col)" @click="changeRatio(col)">
                    <!-- * 表格行 -->
                    <div class="ui-table-row">
                        <!-- * 遍历生成表格列 -->
                        <template v-for="row in option" :key="row.key">
                            <div class="ui-table-column">
                                <slot :name="row.slot" :data="col">{{ col[row.key] }}</slot>
                                <UiIcon :name="receiveChildrenIconName(col)" class="ui-table-children-icon" v-if="receiveChildrenIcon(row)" />
                            </div>
                        </template>
                    </div>

                    <!-- * 嵌套表格 -->
                    <Transition>
                        <div class="ui-table-children" v-if="receiveChildren(col)">
                            <slot name="children" :data="col"></slot>
                        </div>
                    </Transition>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 组件
import UiIcon from "@various/components/icon";

//* 配置项
import { UiTablePropsOption, UiTableEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件配置项
defineOptions({ name: "UiTable" });

const define = defineProps(UiTablePropsOption);
const emit = defineEmits(UiTableEmits);

const { methods } = useComposable(define, emit);
const { changeSort, changeRatio, receiveSort, receiveRatio, receiveChildren, receiveChildrenIcon, receiveChildrenIconName } = methods;
</script>
