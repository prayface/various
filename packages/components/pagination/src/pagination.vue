<template>
    <div class="ui-pagination" v-if="total">
        <div class="ui-pagination-items" v-if="items">{{ info }}</div>
        <div class="ui-pagination-controls">
            <!-- 前进控制器 -->
            <div class="ui-pagination-control" @click="skip(modelValue - 1)">
                <UiIcon name="arrow" class="ui-pagination-next" />
            </div>

            <template v-for="(control, index) in controls" :key="index">
                <!-- 跳跃控制器 -->
                <div v-if="control.type == 'skip'" class="ui-pagination-control" @click="skip(modelValue + skip * control.value)">...</div>
                <!-- 选择控制器 -->
                <div v-else class="ui-pagination-control" :class="{ 'ui-active': control.active }" @click="skip(control.value)">
                    {{ control.value }}
                </div>
            </template>

            <!-- 后退控制器 -->
            <div class="ui-pagination-control" @click="skip(modelValue + 1)">
                <UiIcon name="arrow" class="ui-pagination-back" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiPaginationPropsOption, UiPaginationEmits } from "./pagination";
import Composable from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiPagination",
    emits: UiPaginationEmits,
    props: UiPaginationPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 实例化组合函数
        const composable = new Composable(define, emit);

        //* 导出公共方法
        expose({ skip: composable.methods.skip });

        return {
            ...composable.computeds,
            ...composable.methods,
        };
    },
});
</script>
