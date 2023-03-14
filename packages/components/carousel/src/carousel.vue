<template>
    <component :is="module" v-bind="attrs" ref="component">
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
        const component = ref<InstanceType<typeof defaultVue> | InstanceType<typeof multipleViewVue>>();
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
            skip: (number: number) => component.value?.skip(number),
            next: () => component.value?.next(),
            back: () => component.value?.back(),
        });

        return { attrs, module };
    },
});
</script>
