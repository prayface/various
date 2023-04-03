<template>
    <div class="ui-select" :class="className" :style="style" ref="container">
        <!-- Select主体 -->
        <input class="ui-form-control" v-bind="attrs" @click="show" />

        <!-- 下拉箭头 -->
        <UiIcon name="arrow" class="ui-select-arrow" @click="show" />

        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- 候选项 -->
        <Transition>
            <div class="ui-form-candidates" ref="candidate" v-if="visible" :class="classExtraName || ''">
                <div class="ui-form-candidates-triangle" ref="triangle"></div>
                <div class="ui-form-candidate-container">
                    <template v-for="value in candidates">
                        <div class="ui-form-candidate" :class="{ 'ui-active': value.value == modelValue }" @click="cutCandidate(value.value, $event)">
                            {{ value.label }}
                        </div>
                    </template>
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

<script lang="ts">
import { defineComponent, inject, reactive, toRefs, onUnmounted } from "vue";
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
        onUnmounted(() => {
            if (!refs.candidate) return;
            //* 将内容从视图容器中移除
            node.remove("ui-windows", refs.candidate);
        });

        return {
            ...toRefs(refs),
            ...composable.methods,
            ...composable.computeds,
        };
    },
});
</script>
