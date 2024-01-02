<template>
    <div class="ui-region-selector" ref="container" v-bind="binds.container">
        <div class="ui-form-control" @click="show()">
            <!-- * 主体 -->
            <input type="text" autocomplete="off" :disabled="disabled" readonly />

            <!-- * 内容 -->
            <div class="ui-region-selector-content">
                <template v-for="(value, key) in regions">
                    <span class="ui-region-selector-context" :class="{ 'ui-active': value.children }" @click.stop="show(value.name)">
                        <template v-if="key != 0"> -</template>
                        {{ value.name }}
                    </span>
                </template>
            </div>
        </div>

        <!-- * 箭头 -->
        <UiIcon name="arrow" class="ui-region-selector-arrow" @click="show()" />

        <!-- * 候选项 -->
        <Transition v-on="ons.animation">
            <div class="ui-form-candidates" ref="body" v-if="visible" v-bind="binds.body">
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate-content" v-bind="binds.candidates">
                        <template v-for="value in data">
                            <div class="ui-form-candidate" :class="{ 'ui-active': modelValue.includes(value.name) }" @click="methods.select(value)">
                                <slot name="candidate" :data="value">{{ value.name }}</slot>
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
import { UiRegionSelectorPropsOption, UiRegionSelectorEmits } from "./src";
import { useComposable } from "./src/composable";
//* 公共函数
import { node } from "@various/utils";

//* 组件属性注册
const emits = defineEmits(UiRegionSelectorEmits);
const define = defineProps(UiRegionSelectorPropsOption);

//* 组合函数
const { ons, refs, nodes, binds, methods, computeds } = useComposable(define, emits);
const { regions, disabled } = computeds;
const { show, hidden } = methods;
const { container, body } = nodes;
const { visible, data } = refs;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    body.value && node.remove(document.body, body.value);
});

//* 注册组件配置
defineOptions({ name: "UiRegionSelector" });
defineExpose({ show, hidden });
</script>
