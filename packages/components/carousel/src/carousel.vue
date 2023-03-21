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
    name: "UiCarousel",
    props: UiCarouselPropsOption,
    components: { defaultVue, multipleViewVue },
    setup(define, { expose }) {
        const main = ref<InstanceType<typeof defaultVue | typeof multipleViewVue>>();
        const attrs = computed(() => define);
        const module = computed(() => {
            switch (define.mode) {
                case "default":
                    return defaultVue;
                case "multiple-view":
                    return multipleViewVue;
            }
        });

        // 公共方法导出
        expose({
            cutCarousel: (number: number) => main.value?.cutCarousel(number),
            triggerNext: () => main.value?.triggerNext(),
            triggerBack: () => main.value?.triggerBack(),
        });

        return { main, attrs, module };
    },
});
</script>
