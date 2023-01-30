<template>
    <div class="ui-button" v-loading="disabled" :class="classNameContainer">
        <button :type="type" :class="classNameButton" :style="styles" :disabled="disabled" @click.stop="click">
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
const styles = computed(() => (define.width ? `min-width: ${define.width}px` : ""));
const disabled = computed(() => define.loading || define.disabled);

//* 按钮类名
const classNameButton = computed(() => {
    return define.size != "default" ? `ui-${define.size}` : "";
});

//* 按钮容器类名
const classNameContainer = computed(() => {
    if (disabled.value) {
        if (define.loading) return `ui-button-loading ui-button-${define.mode}`;
        else return `ui-button-disabled ui-button-${define.mode}`;
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
