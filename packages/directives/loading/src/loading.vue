<template>
    <Transition>
        <div class="ui-mask" :class="className" :style="styles" v-if="show">
            <UiIcon class="ui-mash-icon" :name="icon" />
            <div class="ui-mask-content" v-if="content">{{ content }}</div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { UiIcon } from "@various/components";
import { computed } from "vue";
import { LoadingType } from "./loading";

const define = defineProps(LoadingType);
const styles = computed(() => {
    return {
        width: define.width ? `${define.width}px` : "100%",
        height: define.height ? `${define.height}px` : "100%",
    };
});

console.log(define.show);
</script>
