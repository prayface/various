<template>
    <div class="ui-textarea" v-loading="loading" :class="className" :style="styles" ref="main">
        <!-- Input主体 -->
        <textarea class="ui-form-control" v-bind="attrs" v-on="handles" ref="control" resize="none"></textarea>
        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-textarea-clearable" v-if="clearable && modelValue" @click="clear" />
        <!-- 滚动条容器 -->
        <div class="ui-textarea-scroll" v-show="refs.size > 0">
            <div class="ui-textarea-scroll-bar" :style="{ height: refs.size + 'px', transform: `translateY(${refs.offset}px)` }" @mousedown="onMousedown"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TS from "./composable";
import UiIcon from "@various/components/icon";
import { UiFormEmitterKey } from "@various/constants";
import { ref, inject, reactive, onMounted } from "vue";
import { UiTextareaType, UiTextareaEmits } from "./textarea";

// node
const main = ref<HTMLElement>();
const control = ref<HTMLTextAreaElement>();

// 响应式变量声明
const refs = reactive({ size: 0, ratio: 0, offset: 0 });

// 初始化TS的响应式变量
new TS({ refs, main, control });

// 初始化Props和Emits
const emits = defineEmits(UiTextareaEmits);
const define = defineProps(UiTextareaType);
const emitter = define.name ? inject(UiFormEmitterKey) : undefined;

// 主体事件获取
const handles = TS.useOnHanlder(define, emits, emitter);

// 公共事件获取
const { clear, init, onMousedown } = TS.useMethods(define, emits, emitter);

// 计算属性获取
const { attrs, styles, className } = TS.useComputeds(define);

// 事件暴露
defineExpose({ clear });

// 挂载函数
onMounted(() => init());
</script>
