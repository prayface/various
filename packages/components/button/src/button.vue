<template>
    <div class="ui-button" v-loading="disabled" :class="className">
        <button :type="nativeType" :style="style" :disabled="disabled" @click="!disabled && $emit('click', $event)">
            <!-- 按钮图标 -->
            <UiIcon :name="icon" v-if="icon" />
            <!-- 内容插槽 -->
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiButtonPropsOption, UiButtonEmits } from "./button";

import Composable from "./composable";
import UiIcon from "@various/components/icon";
import VLoading from "@various/directives/loading";

export default defineComponent({
    name: "UiButton",
    emits: UiButtonEmits,
    props: UiButtonPropsOption,
    directives: { VLoading },
    components: { UiIcon },
    setup(define) {
        //* 实例化组合函数
        const composable = new Composable(define);
        
        return {
            ...composable.computeds,
        };
    },
});
</script>
