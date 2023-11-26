<template>
    <div class="ui-cascade" ref="container" v-bind="binds.container">
        <!-- * 主体 -->
        <input class="ui-form-control" type="text" v-bind="binds.main" @click="show" />
        <!-- * 箭头 -->
        <UiIcon class="ui-cascade-arrow" name="arrow" @click="show" />
        <!-- * 候选项 -->
        <Transition v-on="ons.animation">
            <div class="ui-form-candidates" ref="body" v-if="visible" v-show="option.length" v-bind="binds.body">
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="binds.candidates">
                        <template v-for="(v, i) in option">
                            <div
                                class="ui-form-candidate"
                                v-on="ons.candidate1(v, i)"
                                ref="candidates"
                                :class="{ 'ui-active': define.modelValue?.[0] == v.value }">
                                <slot name="candidate" :data="v">{{ v.name }}</slot>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- * 次级候选项 -->
        <div class="ui-form-candidates" ref="body2" v-if="ephemeral" v-show="children.length" v-bind="binds.body">
            <div class="ui-form-candidate-container">
                <div class="ui-form-candidate-content" v-bind="binds.candidates">
                    <template v-for="v in children">
                        <div class="ui-form-candidate" :class="{ 'ui-active': define.modelValue?.[1] == v.value }" v-on="ons.candidate2(v)">
                            <slot name="candidate2" :data="v">{{ v.name }}</slot>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 按需导出插件
import { onBeforeUnmount } from "vue";
//* 组件引入
import UiIcon from "@various/components/icon";
//* 项目函数
import { node } from "@various/utils";
//* 组件属性
import { UiCascadePropsOption, UiCascadeEmits } from "./src";
import { useComposable } from "./src/composable";

//* 组件属性注册
const define = defineProps(UiCascadePropsOption);
const emits = defineEmits(UiCascadeEmits);

//* 组合函数
const { ons, refs, nodes, binds, methods, computeds } = useComposable(define, emits);
const { visible, ephemeral } = refs;
const { body, body2, container, candidates } = nodes;
const { show, hidden } = methods;
const { children } = computeds;

//* 销毁时间
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    body.value && node.remove(document.body, body.value);
    body2.value && node.remove(document.body, body2.value);
});

//* 组件属性导出
defineOptions({ name: "UiCascade" });
defineExpose({ show, hidden });
</script>
