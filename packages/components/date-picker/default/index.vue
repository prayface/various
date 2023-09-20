<template>
    <!-- * 时间选择器 -->
    <div class="ui-date-picker" ref="containerNode" :style="style" :class="className">
        <!-- * 选择器主体 -->
        <input class="ui-form-control" type="text" v-bind="attrs" readonly @click="show" />

        <!-- * 清空图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-clearable" name="error" @click="clear" />
        <!-- * 箭头图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-arrow" name="arrow" @click="show" />

        <!-- * 候选列表 -->
        <Transition @before-enter="enterBefore" @enter="enter" @leave="leave">
            <div class="ui-date-picker-candidates" ref="candidateNode" v-bind="candidateAttrs" v-if="visible">
                <component ref="componentNode" :is="analyzeComponent" @update="update" @change="change"></component>
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
import { UiDatePickerPropsOption, UiDatePickerEmits } from "./index";
import { useComposable } from "./src/composable";

//* 公共属性
import { node } from "@various/utils";

//* 组件属性注册
const define = defineProps(UiDatePickerPropsOption);
const emits = defineEmits(UiDatePickerEmits);

//* 组合函数
const { refs, nodes, methods, analyzes, computeds, animations } = useComposable(define, emits);
const { visible } = refs;
const { componentNode, candidateNode, containerNode } = nodes;
const { show, clear, update, change } = methods;
const { analyzeComponent } = analyzes;
const { style, attrs, className, candidateAttrs } = computeds;
const { enterBefore, enter, leave } = animations;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    candidateNode.value && node.remove(document.body, candidateNode.value);
});

//* 初始化组件配置
defineOptions({ name: "UiDatePicker" });
defineExpose({ clear, update, change });
</script>
