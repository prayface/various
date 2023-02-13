<template>
    <form class="ui-form">
        <slot></slot>
    </form>
</template>

<script lang="ts" setup>
import mitt from "mitt";
import { provide } from "vue";
import { UiFormType, UiFormEmitter } from "./form";

const emitter = mitt();
const define = defineProps(UiFormType);

for (const i in define.rules) {
    const rules = define.rules[i];
    emitter.on(i, () => {
        console.log(rules);
    });
}

provide(UiFormEmitter, emitter);
</script>
