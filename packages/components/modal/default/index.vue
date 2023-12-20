<template>
    <Transition>
        <div class="ui-modal ui-mask" v-show="open" ref="main" v-bind="binds.main" @click.self="closeOnClick && closeModal()">
            <div class="ui-modal-container" ref="container" :style="containerStyle">
                <!-- 头部信息 -->
                <div class="ui-modal-header">
                    <slot name="header">{{ title }}</slot>
                </div>

                <!-- 关闭按钮 -->
                <div class="ui-modal-close" v-if="close">
                    <UiIcon name="close" @click="closeModal" />
                </div>

                <!-- 内容 -->
                <div class="ui-modal-content" ref="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
//* Vue
import { onMounted, onBeforeUnmount } from "vue";
//* 公共工具库
import { node } from "@various/utils";
//* 组件属性
import { useComposable } from "./src/composable";
import { UiModalPropsOption, UiModalEmits } from "./index";
//* 组件
import UiIcon from "@various/components/icon";

//* 组件属性注册
const define = defineProps(UiModalPropsOption);
const emits = defineEmits(UiModalEmits);

//* 组合函数
const { refs, binds, methods, computeds } = useComposable(define, emits);
const { containerStyle } = computeds;
const { scrollTo, openModal, closeModal } = methods;
const { open, main, container } = refs;

//* 挂载函数
onMounted(() => {
    refs.observer.value = new ResizeObserver(methods.resizeHandler);
    if (refs.main.value) {
        node.append(document.body, refs.main.value);
    }
});

//* 卸载函数
onBeforeUnmount(() => {
    document.body.style.overflow = "";
    refs.observer.value?.disconnect();
    if (refs.main.value) {
        node.remove(document.body, refs.main.value);
    }
});

//* 组件属性导出
defineOptions({ name: "UiModal" });
defineExpose({ scrollTo, openModal, closeModal });
</script>
