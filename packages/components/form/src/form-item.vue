<template>
    <div class="ui-form-item" :class="className">
        <div class="ui-form-name">俺是名称</div>
        <div class="ui-form-container">
            <slot />
            <Transition>
                <div class="ui-form-message" v-if="visible">俺是提示消息</div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { UiFormEmitter, UiFormItemType } from "./form";

const define = defineProps(UiFormItemType);
const emitter = inject(UiFormEmitter);

const visible = ref(false);

const className = computed(() => `ui-form-${define.direction}`);

if (define.prop) {
    emitter?.emit(define.prop);
}

const show = () => {
    visible.value = true;
    console.log("show");
};

const hidden = () => {
    visible.value = false;
    console.log("hidden");
};

defineExpose({ show, hidden });
</script>
