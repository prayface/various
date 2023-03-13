<template>
    <component :is="module" v-bind="define">
        <slot></slot>
    </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { UiCarouselType } from "./carousel";
import defaultVue from "./modules/default.vue";

const define = defineProps(UiCarouselType);

const module = computed(() => {
    return defaultVue;
});
</script>
