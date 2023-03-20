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

        // 公共方法声明
        const skip = (number: number) => main.value?.skip(number);
        const next = () => main.value?.next();
        const back = () => main.value?.back();

        // 公共方法导出
        expose({ skip, next, back });

        return { main, attrs, module };
    },
});
</script>
