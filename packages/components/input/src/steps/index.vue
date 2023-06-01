<template>
    <div class="ui-steps-input" :style="{ width: width + 'px' }">
        <div class="ui-steps-container" :style="style" :class="{ 'ui-active': currentPage == 'start' }">
            <input type="number" class="ui-form-control ui-steps-control" v-model="modelValue.start" v-bind="startAttrs" v-on="startOns" />
            <input type="number" class="ui-form-control ui-steps-number" v-model="modelValue['start-steps']" v-on="startOns" />
        </div>
        <div class="ui-steps-container" :style="style" :class="{ 'ui-active': currentPage == 'end' }">
            <input type="number" class="ui-form-control ui-steps-control" v-model="modelValue.end" v-bind="endAttrs" v-on="endOns" />
            <input type="number" class="ui-form-control ui-steps-number" v-model="modelValue['end-steps']" v-on="endOns" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiStepsInputPropsOption } from "./index";
import { useComposable } from "./src/composable";

export default defineComponent({
    name: "UiStepsInput",
    props: UiStepsInputPropsOption,
    setup(define, { emit }) {
        const { refs, computeds } = useComposable(define, emit);

        return {
            ...refs,
            ...computeds,
        };
    },
});
</script>
