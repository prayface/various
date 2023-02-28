<template>
    <div class="ui-pagination" v-if="total">
        <div class="ui-pagination-items" v-if="items">{{ info }}</div>
        <div class="ui-pagination-controls">
            <!-- 前进控制器 -->
            <div class="ui-pagination-control" @click="handover(modelValue - 1)">
                <UiIcon name="arrow" class="ui-pagination-next" />
            </div>

            <template v-for="(control, index) in controls" :key="index">
                <!-- 跳跃控制器 -->
                <div v-if="control.type == 'skip'" class="ui-pagination-control" @click="handover(modelValue + skip * control.value)">...</div>
                <!-- 选择控制器 -->
                <div v-else class="ui-pagination-control" :class="{ 'ui-active': control.active }" @click="handover(control.value)">
                    {{ control.value }}
                </div>
            </template>

            <!-- 后退控制器 -->
            <div class="ui-pagination-control" @click="handover(modelValue + 1)">
                <UiIcon name="arrow" class="ui-pagination-back" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 声明变量引入
import { UiPaginationType, UiPaginationEmits } from "./pagination";
// 计算属性引入
import useComputeds from "./useComputeds";
// 组件引入
import UiIcon from "@various/components/icon";

// 初始化Props与Emits
const emits = defineEmits(UiPaginationEmits);
const define = defineProps(UiPaginationType);
// 获取计算属性
const { info, total, controls } = useComputeds(define);
// 切换分页
const handover = (key: number) => {
    if (isNaN(key) || key == define.modelValue) return;
    if (key <= 0) {
        emits("update:modelValue", 1);
        emits("change", 1);
    } else if (key > total.value) {
        emits("update:modelValue", total.value);
        emits("change", total.value);
    } else {
        emits("update:modelValue", key);
        emits("change", key);
    }
};
</script>
