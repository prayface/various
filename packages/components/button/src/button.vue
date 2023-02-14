<template>
    <div class="ui-button" v-loading="disabled" :class="classNameContainer">
        <button :type="type" :class="className" :style="styles" :disabled="disabled" @click="!disabled && emit('click', $event)">
            <!-- 按钮图标 -->
            <UiIcon :name="icon" v-if="icon" />
            <!-- 内容插槽 -->
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import useComputeds from "./useComputeds";
import { UiButtonType, UiButtonEmits } from "./button";

const emit = defineEmits(UiButtonEmits);
const define = defineProps(UiButtonType);

const { styles, disabled, className, classNameContainer } = useComputeds(define);
</script>
