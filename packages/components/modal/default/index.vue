<template>
    <Transition>
        <div class="ui-modal ui-mask" v-show="open" ref="main" :style="mainStyle" :class="classExtraName || ''" @click.self="closeModal">
            <div class="ui-modal-container" ref="container" :style="containerStyle">
                <!-- 头部信息 -->
                <div class="ui-modal-header">
                    <slot name="header">{{ title }}</slot>
                </div>

                <!-- 内容 -->
                <div class="ui-modal-content" ref="content">
                    <slot></slot>
                </div>
            </div>

            <!-- 关闭按钮 -->
            <div class="ui-modal-close" v-if="close">
                <UiIcon name="close" @click="closeModal" />
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { UiModalPropsOption, UiModalEmits } from "./index";
import { node } from "@various/utils";

import Composable from "./src/composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiModal",
    emits: UiModalEmits,
    props: UiModalPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        const { refs, methods, computeds } = Composable(define, emit);

        // 挂载函数
        onMounted(() => {
            refs.observer.value = new ResizeObserver(methods.resizeHandler);
            if (refs.main.value) {
                node.append("ui-modals", refs.main.value);
            }
        });

        // 卸载函数
        onBeforeUnmount(() => {
            document.body.style.overflow = "";
            refs.observer.value?.disconnect();
            if (refs.main.value) {
                node.remove("ui-modals", refs.main.value);
            }
        });

        // 导出公共方法
        expose({ openModal: methods.openModal, close: methods.closeModal });

        return {
            ...refs,
            ...methods,
            ...computeds,
        };
    },
});
</script>
