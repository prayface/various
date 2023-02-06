<template>
    <component :is="component" v-bind="attrs">
        <template #default>
            <slot name="default"></slot>
        </template>
        <template #content v-if="$slots.content">
            <slot name="content"></slot>
        </template>
    </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { TooltipType } from "./tooltip";

import TooltipFixed from "./fixed.vue";
import TooltipFollow from "./follow.vue";

const define = defineProps(TooltipType);
const component = computed(() => {
    switch (define.mode) {
        case "follow":
            return TooltipFollow;
        default:
            return TooltipFixed;
    }
});

const attrs = computed(() => define);
</script>
