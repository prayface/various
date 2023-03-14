<template>
    <component :is="module" v-bind="attrs" ref="main">
        <slot></slot>
    </component>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { UiCarouselPropsOption } from "./carousel";
import defaultVue from "./modules/default.vue";
import multipleViewVue from "./modules/multiple-view.vue";

export default defineComponent({
    components: {
        defaultVue,
        multipleViewVue,
    },
    props: UiCarouselPropsOption,
    setup(define, { expose }) {
        const main = ref<InstanceType<typeof defaultVue> | InstanceType<typeof multipleViewVue>>();
        const attrs = computed(() => define);
        const module = computed(() => {
            switch (define.mode) {
                case "default":
                    return defaultVue;
                case "multiple-view":
                    return multipleViewVue;
            }
        });

        expose({
            skip: (number: number) => main.value?.skip(number),
            next: () => main.value?.next(),
            back: () => main.value?.back(),
        });

        return { main, attrs, module };
    },
});
</script>
