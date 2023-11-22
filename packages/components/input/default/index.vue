<template>
    <div class="ui-input" ref="container" v-bind="attrContainer">
        <!-- * 输入框主体 -->
        <input ref="main" class="ui-form-control" v-bind="attrMain" v-on="eventMain" @keydown.enter="enter" />

        <!-- * 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- * 候选项 -->
        <Transition @before-enter="aniEnterBefore" @enter="aniEnter" @leave="aniLeave">
            <div class="ui-form-candidates" ref="candidate" v-if="visible" v-show="candidates.length" v-bind="attrCandidates">
                <!-- * 候选项的内容容器 -->
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="attrCandidatesContent">
                        <template v-for="value in candidates">
                            <div class="ui-form-candidate" :class="useCandidateName(value.value)" @mousedown="switchCandidate(value, $event)">
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
const { refs, attrs, events, methods, dynamics, computeds, animations } = useComposable(define, emits);
const { main, visible, container, candidate } = refs;
const { attrContainer, attrMain, attrCandidates, attrCandidatesContent } = attrs;
const { eventMain } = events;
const { blur, clear, enter, focus, switchCandidate } = methods;
const { useCandidateName } = dynamics;
const { status } = computeds;
const { aniEnterBefore, aniEnter, aniLeave } = animations;

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
