<template>
    <div class="ui-input" :class="className" :style="style" ref="container">
        <!-- Input主体 -->
        <input ref="main" class="ui-form-control" v-bind="attrs" v-on="inputOns" @keydown.enter="enter" />

        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- 候选项 -->
        <Transition>
            <template v-if="visible">
                <div class="ui-form-candidates" ref="candidate" v-show="candidates?.length" :class="classExtraName || ''" :style="{ zIndex: zIndex }">
                    <div class="ui-form-candidates-triangle" ref="triangle"></div>
                    <div class="ui-form-candidate-container" :style="{ maxHeight: height + 'px' }">
                        <template v-for="value in candidates">
                            <div
                                class="ui-form-candidate"
                                :class="{ 'ui-active': value.value == modelValue }"
                                @mousedown="switchCandidate(value.value, $event)">
                                <slot name="candidate" :data="value">{{ value.label }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </Transition>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
//* 按需导出插件
import { onBeforeUnmount } from "vue";

//* 组件属性
import { UiInputPropsOption, UiInputEmits } from "./index";
import { useComposable } from "./src/composable";

//* 项目函数
import { node } from "@various/utils";

//* 组件
import UiIcon from "@various/components/icon";

//* 注册组件属性
const define = defineProps(UiInputPropsOption);
const emits = defineEmits(UiInputEmits);

//* 组合函数
const { refs, methods, options, computeds } = useComposable(define, emits);
const { main, visible, triangle, container, candidate } = refs;
const { blur, clear, enter, focus, switchCandidate } = methods;
const { status } = options;
const { attrs, style, inputOns, className } = computeds;

//* 销毁时间
onBeforeUnmount(() => {
    //* 检测是否满足运行条件
    if (refs.candidate.value) {
        //* 将内容从视图容器中移除
        node.remove(document.body, refs.candidate.value);
    }
});

//* 注册化组件配置
defineOptions({ name: "UiInput" });
defineExpose({ clear, focus, blur });
</script>
