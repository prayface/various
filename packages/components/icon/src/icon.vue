<template>
    <svg class="ui-icon" aria-hidden="true">
        <use :xlink:href="IconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { IconType } from "./icon";

const define = defineProps(IconType);
const IconName = computed(() => `#icon-${define.name}`);
</script>
