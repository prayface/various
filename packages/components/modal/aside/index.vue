<template>
    <Transition @enter="entranceAnimation" @leave="departureAnimation" @before-enter="entrancePreAnimation">
        <div class="ui-aside-modal ui-mask" v-show="open" ref="main" @click.self="closeModal" :style="{ zIndex: zIndex }">
            <div class="ui-modal-container" ref="container" :style="style">
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
import { UiModalAsidePropsOption, UiModalAsideEmits } from "./index";
import { node } from "@various/utils";

import Composable from "./src/composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiModalAside",
    emits: UiModalAsideEmits,
    props: UiModalAsidePropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        const { refs, methods, computeds } = Composable(define, emit);

        // 挂载函数
        onMounted(() => {
            if (refs.main.value) {
                node.append(document.body, refs.main.value);
            }
        });

        // 卸载函数
        onBeforeUnmount(() => {
            document.body.style.overflow = "";
            if (refs.main.value) {
                node.remove(document.body, refs.main.value);
            }
        });

        // 导出公共方法
        expose({ openModal: methods.openModal, closeModal: methods.closeModal });

        return {
            ...refs,
            ...methods,
            ...computeds,
        };
    },
});
</script>
