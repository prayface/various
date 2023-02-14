<template>
    <div class="ui-input" v-loading="loading" :class="className" :style="styles" ref="main">
        <!-- Input主体 -->
        <input class="ui-form-control" v-bind="attrs" v-on="handles" />
        <!-- 清空按钮 -->
        <UiIcon name="error" class="ui-input-clearable" v-if="clearable && modelValue" @click="clear" />
        <!-- 候选项 -->
        <Transition>
            <div class="ui-form-candidates" v-if="view.visible" ref="container">
                <div class="ui-form-candidates-triangle" ref="triangle"></div>
                <div class="ui-form-candidate-container">
                    <div class="ui-form-candidate" v-for="(value, index) in candidates" :key="index" :class="{ 'ui-active': value.value == modelValue }" @mousedown="onCandidate(value.value, $event)">
                        {{ value.label }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import UiIcon from "@various/components/icon";
import useComputeds from "./useComputeds";
import { node, dispost } from "@various/utils";
import { ref, reactive, toRefs, nextTick } from "vue";
import { UiInputType, UiInputEmits } from "./input";

// node
const main = ref<HTMLElement | undefined>();
const triangle = ref<HTMLElement | undefined>();
const container = ref<HTMLElement | undefined>();

// 候选项视图控制器
const view = reactive({
    visible: false,
    show: () => {
        view.visible = true;
        nextTick(() => {
            if (!main.value || !container.value) return;
            // 将content添加到视图容器中
            node.append("ui-windows", container.value);
            // 根据配置计算当前窗口位置
            const rect = dispost.elementToContainerBoundary(dispost.elementToBodyRect(main.value), dispost.elementToBodyRect(container.value), {
                direction: "bottom",
                align: "top",
            });
            // 将窗口位置添加入窗口中
            if (rect) {
                container.value.style.inset = `${rect.offsetY}px auto auto ${rect.offsetX}px`;
                container.value.style.transform = rect.transform;
                if (rect.triangle && triangle.value) {
                    triangle.value.style.inset = rect.triangle;
                    triangle.value.style.transform = `rotate(${rect.rotate})`;
                }
            }
        });
    },
    hidden: () => {
        view.visible = false;
    },
});

// 初始化Props和Emits
const define = defineProps(UiInputType);
const emits = defineEmits(UiInputEmits);
// 计算属性获取
const { attrs, styles, className, candidates } = useComputeds(define);

// 批量事件声明
const handles = {
    change: (ev: Event) => emits("change", ev),
    input: (ev: InputEvent | Event) => {
        const target = ev.target as HTMLInputElement;
        emits("update:modelValue", target.value);
        emits("input", ev as InputEvent);
    },
    click: (ev: PointerEvent | Event) => emits("click", ev),
    focus: (ev: FocusEvent | Event) => {
        emits("focus", ev);
        define.candidate && view.show();
    },
    blur: (ev: FocusEvent | Event) => {
        emits("blur", ev);
        define.candidate && view.hidden();
    },
};

// 清空事件
const clear = () => {
    emits("update:modelValue", "");
    emits("clear", "clear");
};

// 候选项选择事件
const onCandidate = (value: String, ev: Event) => {
    emits("update:modelValue", value);
    emits("change", ev);
    emits("input", ev);
};

// 事件暴露
defineExpose({ ...toRefs(view), clear });
</script>
