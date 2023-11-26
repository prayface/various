<template>
    <!-- * 时间选择器 -->
    <div class="ui-date-picker" ref="container" v-bind="binds.container">
        <!-- * 选择器主体 -->
        <input class="ui-form-control" type="text" v-bind="binds.main" @click="show" readonly />

        <!-- * 清空图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-clearable" name="error" @click="clear" />
        <!-- * 箭头图标 -->
        <UiIcon class="ui-date-picker-icons ui-date-picker-arrow" name="arrow" @click="show" />

        <!-- * 候选列表 -->
        <Transition v-on="ons.candidates">
            <div class="ui-form-candidates" ref="body" v-if="visible" v-bind="binds.body">
                <div class="ui-form-candidate-container">
                    <component ref="components" :is="analyzeComponent" @update="update" @change="change"></component>
                </div>
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
const { ons, refs, nodes, binds, methods, analyzes } = useComposable(define, emits);
const { visible } = refs;
const { components, container, body } = nodes;
const { show, clear, update, change } = methods;
const { analyzeComponent } = analyzes;

//* 销毁事件
onBeforeUnmount(() => {
    //* 将内容从视图容器中移除
    body.value && node.remove(document.body, body.value);
});

//* 初始化组件配置
defineOptions({ name: "UiDatePicker" });
defineExpose({ clear, update, change });
</script>
