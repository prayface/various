<template>
    <div class="ui-button" :class="className">
        <!-- 按钮主体 -->
        <button :type="nativeType" :style="style" :disabled="disabled" @click="!disabled && $emit('click', $event)">
            <slot></slot>
        </button>
        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="disabled">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiButtonPropsOption, UiButtonEmits } from "./button";
import Composable from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiButton",
    emits: UiButtonEmits,
    props: UiButtonPropsOption,
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
