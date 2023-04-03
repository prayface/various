<template>
    <div class="ui-scope-input">
        <div class="ui-form-control">
            <input class="ui-scope-input-control" type="number" v-model="modelValue.start" />
            <input class="ui-scope-input-control" type="number" v-model="modelValue.end" />
            <div class="ui-scope-input-line"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UiScopeInputEmits, UiScopeInputPropsOption } from "./scope-input";

export default defineComponent({
    name: "UiScopeInput",
    emits: UiScopeInputEmits,
    props: UiScopeInputPropsOption,
    setup(define, { emit, expose }) {},
});
</script>
