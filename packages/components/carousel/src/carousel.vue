<template>
    <component :is="module" v-bind="define">
        <slot></slot>
    </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { UiCarouselType } from "./carousel";
import defaultVue from "./modules/default.vue";
import multipleViewVue from "./modules/multiple-view.vue";

const define = defineProps(UiCarouselType);

const module = computed(() => {
    switch (define.mode) {
        case "default":
            return defaultVue;
        case "multiple-view":
            return multipleViewVue;
    }
});
</script>
