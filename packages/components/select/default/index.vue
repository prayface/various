<template>
    <div class="ui-select" :class="className" :style="style" ref="container">
        <!-- Select主体 -->
        <input class="ui-form-control" type="text" v-bind="attrs" :value="value" @click="show" />

        <!-- 下拉箭头 -->
        <UiIcon name="arrow" class="ui-select-arrow" @click="show" />

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
//* 按需移入的插件
import { onBeforeUnmount } from "vue";

//* 组件属性
import { UiSelectPropsOption, UiSelectEmits } from "./index";
import { useComposable } from "./src/composable";

//* 公共属性
import { node } from "@various/utils";

//* 注册组件属性
const define = defineProps(UiSelectPropsOption);
const emits = defineEmits(UiSelectEmits);

//* 组合函数
const { refs, status, methods, computeds } = useComposable(define, emits);
const { visible, triangle, candidate, container } = refs;
const { show, clear, hidden, switchCandidate } = methods;
const { value, attrs, style, className } = computeds;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    candidate.value && node.remove(document.body, candidate.value);
});

//* 注册组件配置
defineOptions({ name: "UiSelect" });
defineExpose({ show, clear, hidden });
</script>
