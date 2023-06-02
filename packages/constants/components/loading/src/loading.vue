<template>
    <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
        <div v-if="visible" class="ui-loading ui-mask" :style="style" :class="className">
            <UiIcon class="ui-loading-icon" ref="iconNode" :name="icon" />
            <div class="ui-loading-content" v-if="message">{{ message }}</div>
        </div>
    </Transition>
</template>

<script lang="ts">
import UiIcon from "@various/components/icon";
import { UiLoadingPropsOption } from "./loading";
import { defineComponent } from "vue";
import { useComposable } from "./composable";

export default defineComponent({
    name: "UiLoading",
    props: UiLoadingPropsOption,
    components: { UiIcon },
    setup(define) {
        const { computeds, methods, refs } = useComposable(define);

        return { ...computeds, ...methods, ...refs };
    },
});
</script>

<style lang="less" scoped>
.ui-loading {
    .ui-loading-icon {
        font-size: 20px;
    }
}

.ui-loading.ui-fixed-loading {
    position: fixed;
    flex-direction: column;
    .ui-loading-icon {
        font-size: 36px;
    }

    .ui-loading-content {
        margin: 8px 0 0;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>
