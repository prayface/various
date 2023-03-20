<template>
    <svg class="ui-icon" aria-hidden="true" @click="$emit('click', $event)">
        <use :xlink:href="name"></use>
    </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { UiIconEmits, UiIconPropsOption } from "./icon";

export default defineComponent({
    name: "UiIcon",
    emits: UiIconEmits,
    props: UiIconPropsOption,
    setup(define) {
        const name = computed(() => {
            return `#icon-${define.name}`;
        });

        return { name };
    },
});
</script>
