<template>
    <form class="ui-form">
        <slot></slot>
    </form>
</template>

<script lang="ts" setup>
import mitt from "mitt";
import { provide } from "vue";
import { UiFormType, UiFormRulesKey } from "./form";
import { UiFormEmitterKey, UiFormDataKey } from "@various/constants";

const emitter = mitt();
const define = defineProps(UiFormType);

provide(UiFormEmitterKey, emitter);
provide(UiFormDataKey, define.data);
provide(UiFormRulesKey, define.rules);
</script>
