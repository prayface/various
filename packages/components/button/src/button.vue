<template>
    <div class="ui-button" v-loading="loading">
        <button :type="type" :class="className" :disabled="disabled" @click.stop="click">
            <!-- 按钮图标 -->
            <UiIcon :name="icon" v-if="icon" />
            <!-- 内容插槽 -->
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import { ButtonType } from "./button";
import { computed } from "vue";

const emit = defineEmits(["click"]);
const define = defineProps(ButtonType);
const disabled = computed(() => define.loading || define.disabled);
const className = computed(() => {
    if (define.size != "default") {
        return `ui-button-${define.mode} ui-${define.size}`;
    } else {
        return `ui-button-${define.mode}`;
    }
});

const click = (ev: MouseEvent | PointerEvent) => {
    if (!disabled.value) {
        emit("click", ev);
    }
};
</script>
