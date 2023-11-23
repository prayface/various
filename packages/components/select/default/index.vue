<template>
    <div class="ui-select" ref="container" v-bind="binds.container.value">
        <!-- * 主体 -->
        <input class="ui-form-control" type="text" v-bind="binds.main.value" @click="show" />

        <!-- * 箭头 -->
        <UiIcon name="arrow" class="ui-select-arrow" @click="show" />

        <!-- * 清空 -->
        <UiIcon name="error" class="ui-form-clearable" v-if="clearable && modelValue" @click="clear" />

        <!-- * 候选项 -->
        <Transition v-on="ons.candidates">
            <div class="ui-form-candidates" ref="candidate" v-if="visible" v-show="candidates.length" v-bind="binds.candidates.value">
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="binds.candidate.value">
                        <template v-for="value in candidates">
                            <div class="ui-form-candidate" :class="dynamics.activate(value)" v-on="ons.candidate(value)">
                                <slot name="candidate" :data="value">{{ value.label }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- * 遮罩层 -->
        <Transition>
            <div class="ui-mask ui-loading" v-if="status.name == 'loading'">
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
const { ons, refs, binds, methods, dynamics, computeds } = useComposable(define, emits);
const { visible, candidate, container } = refs;
const { show, clear, hidden } = methods;
const { status } = computeds;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    candidate.value && node.remove(document.body, candidate.value);
});

//* 注册组件配置
defineOptions({ name: "UiSelect" });
defineExpose({ show, clear, hidden });
</script>
