<template>
    <div class="ui-button" :class="className">
        <!-- 按钮主体 -->
        <button class="ui-button-main" :type="nativeType" :style="style" :disabled="disabled" @click="click">
            <slot></slot>
        </button>
        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
//* 组件引入
import UiIcon from "@various/components/icon";

//* 函数引入
import { UiButtonPropsOption, UiButtonEmits } from "./index";
import { useComposable } from "./src/composable";

//* 声明组件配置
defineOptions({ name: "UiButton" });

//* 注册组件CTX
const define = defineProps(UiButtonPropsOption);
const emits = defineEmits(UiButtonEmits);

//* 组合函数
const { computeds, methods, status } = useComposable(define, emits);
const { className, style } = computeds;
const { click } = methods;

//* 暴露函数
defineExpose({ click });
</script>
