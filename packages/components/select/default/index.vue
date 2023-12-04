<template>
    <div class="ui-select" ref="container" v-bind="binds.container">
        <!-- * 主体 -->
        <input class="ui-form-control" type="text" v-bind="binds.main" @click="show" readonly />

        <!-- * 箭头 -->
        <UiIcon name="arrow" class="ui-select-arrow" @click="show" />

        <!-- * 清空 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- * 候选项 -->
        <Transition v-on="ons.animation">
            <div class="ui-form-candidates" ref="body" v-if="visible" v-show="candidates.length" v-bind="binds.body">
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="binds.candidates">
                        <template v-for="value in candidates">
                            <div class="ui-form-candidate" :class="{ 'ui-active': modelValue == value.value }" v-on="ons.candidate(value)">
                                <slot name="candidate" :data="value">{{ value.label }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- * 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="loading">
                <UiIcon class="ui-mask-icon" name="loading" />
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
const { ons, refs, binds, nodes, methods } = useComposable(define, emits);
const { visible } = refs;
const { container, body } = nodes;
const { show, clear, hidden } = methods;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    body.value && node.remove(document.body, body.value);
});

//* 注册组件配置
defineOptions({ name: "UiSelect" });
defineExpose({ show, clear, hidden });
</script>
