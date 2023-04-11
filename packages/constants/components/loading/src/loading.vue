<template>
    <Transition>
        <div class="ui-mask" :class="className" v-if="show">
            <UiIcon class="ui-mask-icon" :name="icon" />
            <div class="ui-mask-content" v-if="content">{{ content }}</div>
        </div>
    </Transition>
</template>

<script lang="ts">
import UiIcon from "@various/components/icon";
import { UiLoadingPropsOption } from "./loading";
import { defineComponent } from "vue";

export default defineComponent({
    name: "UiLoading",
    props: UiLoadingPropsOption,
    components: { UiIcon },
});
</script>
