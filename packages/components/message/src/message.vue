<template>
    <Transition :appear="true">
        <div class="ui-message" :class="className" :style="styles">
            <UiIcon class="ui-message-icon" :name="icon" v-if="icon" />
            <div class="ui-message-content">{{ message }}</div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import { computed } from "vue";
import { UiMessageType } from "./message";

const define = defineProps(UiMessageType);
const styles = computed(() => {
    return {
        transform: `translateY(${define.offset}px)`,
    };
});
const className = computed(() => `ui-message-${define.type}`);
</script>
