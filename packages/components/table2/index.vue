<template>
    <div class="ui-table2" ref="container" :class="{ 'ui-table2-selector': ['checkbox', 'children', 'radio'].includes(selector || '') }">
        <!-- * 表格头部区域 -->
        <div class="ui-table2-header">
            <div class="ui-table2-row" ref="head">
                <!-- * 遍历生成表格列 -->
                <div class="ui-table2-column" v-for="row in option" :key="row.key" :name="row.key" :style="disposable.align(row)">
                    <!-- * 表格文本内容区域 -->
                    <span class="ui-table2-context">
                        <slot :name="row.slot || row.key + '_head'" :data="row">{{ row.name }}</slot>
                    </span>

                    <!-- * 表格排序控件 -->
                    <div class="ui-table2-sort" v-if="row.sort" @click="methods.sort(row)">
                        <div class="ui-table2-trigger" :class="{ 'ui-active': sorts.key == row.key && sorts.value == 'asc' }"></div>
                        <div class="ui-table2-trigger" :class="{ 'ui-active': sorts.key == row.key && sorts.value == 'desc' }"></div>
                    </div>

                    <!-- * 表格额外控件 -->
                    <ui-tooltip class="ui-table2-extra" v-if="row.extra" v-bind="disposable.extra(row)">
                        <ui-icon :name="row['extra-icon'] || 'filter'" />
                        <template #content>
                            <slot :name="row.slot || row.key + '_extra'" :data="row"></slot>
                        </template>
                    </ui-tooltip>

                    <!-- * 表格解释控件 -->
                    <ui-tooltip-follow class="ui-table2-explain" v-if="row.explain" :class-extra-name="row['explain-name']">
                        <ui-icon :name="row['explain-icon'] || 'explain'" />
                        <template #content>
                            <slot :name="row.slot || row.key + '_explain'" :data="row">{{ row.explain }}</slot>
                        </template>
                    </ui-tooltip-follow>
                </div>
            </div>
        </div>

        <!-- * 表格内容区域 -->
        <simplebar data-simplebar-auto-hide="false" :style="size">
            <div class="ui-table2-bodys" ref="main">
                <!-- * 无数据处理 -->
                <div class="ui-table2-body ui-table2-error" v-if="!data?.length && error">
                    <div class="ui-table2-row">{{ error }}</div>
                </div>

                <!-- * 内容 -->
                <template v-else>
                    <template v-for="(value, index) in data">
                        <div class="ui-table2-body" ref="bodys" v-bind="disposable.body(value, index)" @click="methods.select(index)">
                            <!-- * 表格行 -->
                            <div class="ui-table2-row">
                                <!-- * 遍历生成表格列 -->
                                <template v-for="row in option">
                                    <div class="ui-table2-column" :class="row.className" :name="row.key" :style="disposable.align(row)">
                                        <!-- * 表格文本内容区域 -->
                                        <div class="ui-table2-context">
                                            <slot :name="row.slot || row.key" :data="value">{{ value[row.key] }}</slot>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <!-- * 嵌套表格 -->
                            <Transition v-on="ons.animation">
                                <div class="ui-table2-children" v-if="childrens.includes(index)">
                                    <slot name="children" :data="value"></slot>
                                </div>
                            </Transition>
                        </div>
                    </template>
                </template>
            </div>
        </simplebar>
    </div>
</template>

<script lang="ts" setup>
//* Vue
import { onMounted, onBeforeUnmount } from "vue";
//* 滚动条组件
import simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
//* 组件引入
import UiIcon from "@various/components/icon";
import { UiTooltip, UiTooltipFollow } from "@various/components/tooltip";
//* 组件属性
import { UiTablePropsOption2, UiTableEmits2 } from "./src/component";
import { useComposable } from "./src/composable";

//* 组件属性注册
const define = defineProps(UiTablePropsOption2);
const emits = defineEmits(UiTableEmits2);

//* 组合函数
const { ons, refs, nodes, watchs, methods, variable, computeds, disposable } = useComposable(define, emits);
const { sorts, childrens } = refs;
const { container, bodys, head, main } = nodes;
const { sort, radio, checkbox, children } = methods;
const { size } = computeds;

//* 组件挂载时，初始化
onMounted(() => {
    if (!container.value) return;
    else {
        //* 注册observer
        variable.observer.value = new ResizeObserver(() => {
            //* 检测表格尺寸是否发生变更
            if (container.value?.clientWidth && variable.size != container.value.clientWidth) {
                //* 缓存上一个尺寸
                variable.size = container.value.clientWidth;
                //* 重新计算表格宽度
                methods.init();
            }
        });
        //* 挂载观察者
        variable.observer.value.observe(container.value);
    }
});

//* 组件卸载时，移除观察者
onBeforeUnmount(() => {
    //* 移除观察者
    variable.observer.value?.disconnect();
    //* 移除侦听器
    watchs.watch_stop?.();
});

//* 组件属性导出
defineOptions({ name: "UiTable2" });
defineExpose({ sort, radio, checkbox, children });
</script>
