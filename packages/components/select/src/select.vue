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
                                @mousedown="cutCandidate(value.value, $event)">
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
import { defineComponent, inject, reactive, toRefs, onBeforeUnmount } from "vue";
import { UiSelectEmits, UiSelectPropsOption } from "./select";
import { UiFormEmitterKey } from "@various/constants";
import { node } from "@various/utils";
import Composable, { UiSelectConstructorRefs } from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiSelect",
    emits: UiSelectEmits,
    props: UiSelectPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 初始化响应式变量
        const refs = reactive<UiSelectConstructorRefs>({
            visible: false,
            triangle: undefined,
            container: undefined,
            candidate: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 导出公共函数
        expose({
            hidden: composable.methods.hidden,
            clear: composable.methods.clear,
            show: composable.methods.show,
        });

        //* 销毁事件
        onBeforeUnmount(() => {
            if (!refs.candidate) return;
            //* 将内容从视图容器中移除
            node.remove(document.body, refs.candidate);
        });

        return {
            ...toRefs(refs),
            ...composable.methods,
            ...composable.computeds,
        };
    },
});
</script>
