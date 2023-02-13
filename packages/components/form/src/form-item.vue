<template>
    <div class="ui-form-item"></div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { UiFormEmitter, UiFormItemType } from "./form";

const define = defineProps(UiFormItemType);
const emitter = inject(UiFormEmitter);

if (define.prop) {
    emitter?.emit(define.prop);
}
</script>
