<template>
    <component :is="component" v-bind="attrs">
        <template #default>
            <slot name="default"></slot>
        </template>
        <template #content v-if="$slots.content">
            <slot name="content"></slot>
        </template>
    </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { UiTooltipPropsOption } from "./tooltip";

import TooltipFixed from "./modules/fixed.vue";
import TooltipFollow from "./modules/follow.vue";

export default defineComponent({
    name: "UiTooltip",
    props: UiTooltipPropsOption,
    components: { TooltipFixed, TooltipFollow },
    setup(define) {
        //* 属性
        const attrs = computed(() => define);

        //* 组件
        const component = computed(() => {
            switch (define.mode) {
                case "follow":
                    return TooltipFollow;
                default:
                    return TooltipFixed;
            }
        });

        return { attrs, component };
    },
});
</script>
