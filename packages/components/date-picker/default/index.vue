<template>
    <!-- * 时间选择器 -->
    <div class="ui-date-picker" ref="containerNode" :style="style" :class="className">
        <!-- * 选择器主体 -->
        <input class="ui-form-control" type="text" v-bind="attrs" readonly @click="show" />

        <!-- * 清空图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-clearable" name="error" />
        <!-- * 箭头图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-arrow" name="arrow" />

        <!-- * 候选列表 -->
        <Transition @before-enter="enterBefore" @enter="enter" @leave="leave">
            <div class="ui-date-picker-candidates" ref="candidateNode" v-bind="candidateAttrs" v-if="visible">
                <component ref="componentNode" :is="analyzeComponent" @update="update" @change="change"></component>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
//* 组件引入
import UiIcon from "@various/components/icon";

//* 组件属性
import { UiDatePickerPropsOption, UiDatePickerEmits } from "./index";
import { useComposable } from "./src/composable";

//* 组件属性注册
const define = defineProps(UiDatePickerPropsOption);
const emits = defineEmits(UiDatePickerEmits);

//* 组合函数
const { refs, nodes, methods, analyzes, computeds, animations } = useComposable(define, emits);
const { visible } = refs;
const { componentNode, candidateNode, containerNode } = nodes;
const { show, update, change } = methods;
const { analyzeComponent } = analyzes;
const { style, attrs, className, candidateAttrs } = computeds;
const { enterBefore, enter, leave } = animations;

//* 初始化组件配置
defineOptions({ name: "UiDatePicker" });
</script>
