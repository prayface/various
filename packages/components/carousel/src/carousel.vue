<template>
    <component :is="module" v-bind="attrs" ref="main">
        <slot></slot>
    </component>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { UiCarouselPropsOption } from "./carousel";
import _ from "lodash";
import defaultVue from "./modules/default.vue";
import multipleViewVue from "./modules/multiple-view.vue";

export default defineComponent({
    name: "UiCarousel",
    props: UiCarouselPropsOption,
    components: { defaultVue, multipleViewVue },
    setup(define, { expose }) {
        //* 组件实例
        const main = ref<InstanceType<typeof defaultVue | typeof multipleViewVue>>();

        //* 属性
        const attrs = computed(() => define);

        //* 组件
        const module = computed(() => {
            switch (define.mode) {
                case "default":
                    return defaultVue;
                case "multiple-view":
                    return multipleViewVue;
            }
        });

        const methods = {
            cutCarousel: (number: number) => main.value?.cutCarousel(number),
            triggerNext: () => main.value?.triggerNext(),
            triggerBack: () => main.value?.triggerBack(),
        };

        // 公共方法导出
        expose(methods);

        return { main, attrs, module, ...methods };
    },
});
</script>
