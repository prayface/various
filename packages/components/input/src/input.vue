<template>
    <div class="ui-input" :class="className" :style="style" ref="container">
        <!-- Input主体 -->
        <input class="ui-form-control" v-bind="attrs" v-on="handles" />

        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- 候选项 -->
        <Transition>
            <div class="ui-form-candidates" v-if="visible" ref="candidate">
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
import { defineComponent, reactive, inject, toRefs, onUnmounted } from "vue";
import { UiInputPropsOption, UiInputEmits } from "./input";
import { UiFormEmitterKey } from "@various/constants";
import { node } from "@various/utils";
import Composable, { UiInputConstructorRefs } from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiInput",
    emits: UiInputEmits,
    props: UiInputPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = define.name ? inject(UiFormEmitterKey) : undefined;

        //* 初始化响应式变量
        const refs = reactive<UiInputConstructorRefs>({
            visible: false,
            triangle: undefined,
            container: undefined,
            candidate: undefined,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 暴露公共方法
        expose({ clear: composable.methods.clear });

        //* 销毁事件
        onUnmounted(() => {
            if (!refs.candidate) return;
            //* 将内容从视图容器中移除
            node.remove("ui-windows", refs.candidate);
        });

        return {
            clear: composable.methods.clear,
            cutCandidate: composable.methods.cutCandidate,
            ...composable.computeds,
            ...composable.handles,
            ...toRefs(refs),
        };
    },
});
</script>
