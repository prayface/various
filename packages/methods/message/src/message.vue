<template>
    <Transition :appear="true">
        <div class="ui-message" :class="className" :style="styles">
            <UiIcon class="ui-message-icon" :name="icon" v-if="icon" />
            <div class="ui-message-content">{{ message }}</div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { UiMessagePropsOption } from "./message";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiMessage",
    props: UiMessagePropsOption,
    components: { UiIcon },
    setup(define) {
        return {
            className: computed(() => `ui-${define.type}-type`),
            styles: computed(() => {
                return {
                    transform: `translateY(${define.offset}px)`,
                };
            }),
        };
    },
});
</script>
