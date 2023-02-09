<template>
    <svg class="ui-icon" aria-hidden="true">
        <use :xlink:href="IconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { UiIconType } from "./icon";

const define = defineProps(UiIconType);
const IconName = computed(() => `#icon-${define.name}`);
</script>
