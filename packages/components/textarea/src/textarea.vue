<template>
    <div class="ui-textarea" v-loading="loading" :class="className" :style="styles" ref="main">
        <!-- Input主体 -->
        <textarea class="ui-form-control" v-bind="attrs" v-on="handles" resize="none"></textarea>
        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-textarea-clearable" v-if="clearable && modelValue" @click="clear" />
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import useComputeds from "./useComputeds";
import { UiFormEmitterKey } from "@various/constants";
import { ref, inject } from "vue";
import { UiTextareaType, UiTextareaEmits } from "./textarea";

// node
const main = ref<HTMLElement | undefined>();

// 初始化Props和Emits
const emits = defineEmits(UiTextareaEmits);
const define = defineProps(UiTextareaType);
const emitter = define.name ? inject(UiFormEmitterKey) : null;

// 计算属性获取
const { attrs, styles, className } = useComputeds(define);

// 批量事件声明
const handles = {
    change: (ev: Event) => {
        emits("change", ev);
        emitter?.emit(define.name || "", "change");
    },
    input: (ev: InputEvent | Event) => {
        const target = ev.target as HTMLInputElement;
        emits("update:modelValue", target.value);
        emits("input", ev as InputEvent);
    },
    click: (ev: PointerEvent | Event) => emits("click", ev),
    focus: (ev: FocusEvent | Event) => {
        emits("focus", ev);
    },
    blur: (ev: FocusEvent | Event) => {
        emits("blur", ev);
        emitter?.emit(define.name || "", "blur");
    },
};

// 清空事件
const clear = () => {
    emits("update:modelValue", "");
    emits("clear", "clear");
    emitter?.emit(define.name || "", "change");
};

// 事件暴露
defineExpose({ clear });
</script>
