<template>
    <div class="ui-pagination" v-if="total">
        <!-- * 分页信息 -->
        <div class="ui-pagination-items" v-if="items">
            <slot name="items" :page="modelValue" :limit="limit" :total="total" :count="count">{{ info }}</slot>
        </div>

        <!-- * 分页控制器 -->
        <div class="ui-pagination-controls">
            <!-- * 后退控制器 -->
            <div class="ui-pagination-control" @click="back" :class="{ 'ui-disabled-status': modelValue <= 1 }">
                <UiIcon name="arrow" class="ui-pagination-next" />
            </div>

            <template v-for="control in controls" :key="control.type + control.value">
                <!-- * 跳跃控制器 -->
                <div v-if="control.type == 'skip'" class="ui-pagination-control" @click="switchNumber(modelValue + skip * control.value)">...</div>
                <!-- * 选择控制器 -->
                <div v-else class="ui-pagination-control" :class="{ 'ui-active': control.active }" @click="switchNumber(control.value)">
                    {{ control.value }}
                </div>
            </template>

            <!-- * 前进控制器 -->
            <div class="ui-pagination-control" @click="next" :class="{ 'ui-disabled-status': modelValue >= total }">
                <UiIcon name="arrow" class="ui-pagination-back" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 组件引入
import UiIcon from "@various/components/icon";

//* 函数引入
import { UiPaginationEmits, UiPaginationPropsOption } from "./index";
import { useComposable } from "./src/composable";

//* 注册组件CTX
const define = defineProps(UiPaginationPropsOption);
const emits = defineEmits(UiPaginationEmits);

//* 组合函数
const { computeds, methods } = useComposable(define, emits);
const { controls, total, info } = computeds;
const { switchNumber, next, back } = methods;

//* 声明组件配置
defineExpose({ switchNumber, next, back });
defineOptions({ name: "UiPagination" });
</script>
