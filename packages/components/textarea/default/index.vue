<template>
    <div class="ui-textarea" :class="className" :style="style">
        <!-- * 输入框主体 -->
        <textarea class="ui-form-control" ref="inputNode" v-on="inputHandler" v-bind="attrs" @keydown.enter="enter"></textarea>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { UiTextareaEmits, UiTextareaPropsOption } from "./index";
import { useComposable } from "./src/composable";

import UiIcon from "@various/components/icon";

//* 初始化Vue属性
const define = defineProps(UiTextareaPropsOption);
const emits = defineEmits(UiTextareaEmits);

//* 组合函数
const { refs, methods, handlers, computeds } = useComposable(define, emits);
const { className, status, style, attrs } = computeds;
const { inputHandler } = handlers;
const { enter, clear, focus, blur } = methods;
const { inputNode } = refs;

//* 组件配置
defineOptions({ name: "UiTextarea" });
defineExpose({ clear, focus, blur });
</script>
