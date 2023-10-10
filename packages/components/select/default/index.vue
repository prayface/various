<template>
    <div class="ui-select" ref="container" v-bind="attrContainer">
        <!-- Select主体 -->
        <input class="ui-form-control" type="text" v-bind="attrMain" @click="show" />

        <!-- 下拉箭头 -->
        <UiIcon name="arrow" class="ui-select-arrow" @click="show" />

        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- 候选项 -->
        <Transition @before-enter="aniEnterBefore" @enter="aniEnter" @leave="aniLeave">
            <div class="ui-form-candidates" ref="candidate" v-if="visible" v-show="candidates.length" v-bind="attrCandidates">
                <div class="ui-form-candidates-triangle" ref="triangle"></div>
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="attrCandidatesContent">
                        <template v-for="value in candidates">
                            <div class="ui-form-candidate" :class="useCandidateName(value.value)" @mousedown="switchCandidate(value.value, $event)">
                                <slot name="candidate" :data="value">{{ value.label }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
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

//* 组件引入
import UiIcon from "@various/components/icon";

//* 组件属性
import { UiSelectPropsOption, UiSelectEmits } from "./index";
import { useComposable } from "./src/composable";

//* 公共属性
import { node } from "@various/utils";

//* 注册组件属性
const define = defineProps(UiSelectPropsOption);
const emits = defineEmits(UiSelectEmits);

//* 组合函数
const { refs, attrs, methods, dynamics, computeds, animations } = useComposable(define, emits);
const { visible, triangle, candidate, container } = refs;
const { attrCandidatesContent, attrCandidates, attrContainer, attrMain } = attrs;
const { show, clear, hidden, switchCandidate } = methods;
const { useCandidateName } = dynamics;
const { status } = computeds;
const { aniEnterBefore, aniEnter, aniLeave } = animations;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    candidate.value && node.remove(document.body, candidate.value);
});

//* 注册组件配置
defineOptions({ name: "UiSelect" });
defineExpose({ show, clear, hidden });
</script>
