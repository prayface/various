<template>
    <svg class="ui-icon" aria-hidden="true" @click="emits('click', $event)">
        <use :xlink:href="IconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { UiIconType, UiIconEmits } from "./icon";

const emits = defineEmits(UiIconEmits);
const define = defineProps(UiIconType);
const IconName = computed(() => `#icon-${define.name}`);
</script>
