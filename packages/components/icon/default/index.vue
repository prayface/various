<template>
    <svg class="ui-icon" aria-hidden="true" @click="click">
        <use :xlink:href="name"></use>
    </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { UiIconEmits, UiIconPropsOption } from "./index";

const define = defineProps(UiIconPropsOption);
const emits = defineEmits(UiIconEmits);

const click = (ev: MouseEvent | Event) => emits("click", ev);
const name = computed(() => {
    return `#icon-${define.name}`;
});

defineOptions({ name: "UiIcon" });
</script>
