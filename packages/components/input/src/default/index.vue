<template>
    <div class="ui-input" :class="className" :style="style" ref="container">
        <!-- Input主体 -->
        <input ref="input" class="ui-form-control" v-bind="attrs" v-on="inputOns" @keydown.enter="enter" />

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
                                @click="cutCandidate(value.value, $event)">
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

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { UiInputPropsOption, UiInputEmitsOption } from "./index";
import { node } from "@various/utils";
import { useComposable } from "./src/composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiInput",
    props: UiInputPropsOption,
    emits: UiInputEmitsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 获取组合函数
        const { refs, options, methods, computeds } = useComposable(define, emit);

        //* 导出公共函数
        expose({ clear: methods.clear, focus: methods.focus, blur: methods.blur });

        //* 销毁事件
        onBeforeUnmount(() => {
            //* 检测是否满足运行条件
            if (!refs.candidate.value) return;
            //* 将内容从视图容器中移除
            node.remove(document.body, refs.candidate.value);
        });

        return {
            ...refs,
            ...options,
            ...methods,
            ...computeds,
        };
    },
});
</script>
