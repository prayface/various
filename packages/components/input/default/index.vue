<template>
    <div class="ui-input" ref="container" v-bind="binds.container">
        <!-- * 输入框主体 -->
        <input ref="main" class="ui-form-control" :value="modelValue" v-bind="binds.main" v-on="ons.main" @keydown.enter="enter" />
        <!-- * 清空按钮 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />
        <!-- * 候选项 -->
        <Transition v-on="ons.animation">
            <div class="ui-form-candidates" ref="body" v-if="visible" v-show="candidates.length" v-bind="binds.body">
                <!-- * 候选项的内容容器 -->
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="binds.candidates">
                        <template v-for="value in candidates">
                            <div class="ui-form-candidate" :class="{ 'ui-active': define.modelValue == value.value }" v-on="ons.candidate(value)">
                                <slot name="candidate" :data="value">{{ value.label }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="loading">
                <UiIcon name="loading" class="ui-mask-icon" />
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
const { ons, refs, binds, nodes, methods } = useComposable(define, emits);
const { visible } = refs;
const { main, body, container } = nodes;
const { blur, clear, enter, focus } = methods;

//* 销毁时间
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    body.value && node.remove(document.body, body.value);
});

//* 注册化组件配置
defineOptions({ name: "UiInput" });
defineExpose({ clear, focus, blur });
</script>
