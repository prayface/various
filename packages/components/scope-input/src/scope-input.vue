<template>
    <div class="ui-scope-input" :class="className" :style="style">
        <div class="ui-form-control">
            <input class="ui-scope-input-control" type="number" v-on="handles" v-bind="attrs.start" v-model="modelValue.start" />
            <div class="ui-scope-input-line"></div>
            <input class="ui-scope-input-control" type="number" v-on="handles" v-bind="attrs.end" v-model="modelValue.end" />
        </div>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
                <UiIcon name="loading" class="ui-mask-icon" v-show="status.is" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { UiScopeInputEmits, UiScopeInputPropsOption } from "./scope-input";
import { UiFormEmitterKey } from "@various/constants";
import Composable, { UiScopeInputRefs } from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiScopeInput",
    emits: UiScopeInputEmits,
    props: UiScopeInputPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        //* 初始化mitt
        const emitter = inject(UiFormEmitterKey, undefined);

        //* 初始化响应式变量
        const refs = reactive<UiScopeInputRefs>({
            active: false,
        });

        //* 实例化组合函数
        const composable = new Composable(refs, define, emit, emitter);

        //* 导出方法
        expose({ clear: composable.methods.clear });

        return {
            ...composable.computeds,
            ...composable.handles,
            ...composable.methods,
        };
    },
});
</script>
