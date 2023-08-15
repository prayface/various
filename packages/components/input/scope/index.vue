<template>
    <div class="ui-scope-input" :class="className" :style="style">
        <div class="ui-form-control">
            <input class="ui-scope-input-control" type="number" v-on="mainHandler" v-bind="attrs.start" v-model="modelValue.start" />
            <div class="ui-scope-input-line"></div>
            <input class="ui-scope-input-control" type="number" v-on="mainHandler" v-bind="attrs.end" v-model="modelValue.end" />
        </div>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
//* 组件属性
import { UiScopeInputPropsOption, UiScopeInputEmits } from "./index";
import { useComposable } from "./src/composable";

//* 注册组件属性
const define = defineProps(UiScopeInputPropsOption);
const emits = defineEmits(UiScopeInputEmits);

//* 组合函数
const { status, methods, handlers, computeds } = useComposable(define, emits);
const { clear } = methods;
const { mainHandler } = handlers;
const { style, attrs, className } = computeds;

//* 注册化组件配置
defineOptions({ name: "UiScopeInput" });
defineExpose({ clear });
</script>
