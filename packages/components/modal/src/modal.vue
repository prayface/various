<template>
    <Transition>
        <div class="ui-modal ui-mask" v-show="open" ref="main" :class="classExtraName || ''">
            <div class="ui-modal-container" ref="container" :style="style">
                <!-- 关闭按钮 -->
                <div class="ui-modal-close" v-if="close">
                    <UiIcon name="close" @click="closeModal" />
                </div>

                <!-- 头部信息 -->
                <div class="ui-modal-header">
                    <slot name="header">{{ title }}</slot>
                </div>

                <!-- 内容 -->
                <div class="ui-modal-content" ref="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from "vue";
import { UiModalPropsOption, UiModalEmits } from "./modal";
import { node } from "@various/utils";
import Composable, { UiModalConstructorRefs } from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiModal",
    emits: UiModalEmits,
    props: UiModalPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        // 响应式变量
        const refs = reactive<UiModalConstructorRefs>({
            open: false,
            main: undefined,
            container: undefined,
        });

        // 实例化工具类
        const composable = new Composable(refs, define, emit);

        // 挂载函数
        onMounted(() => {
            if (!refs.main) return;
            node.append("ui-modals", refs.main);
        });

        // 卸载函数
        onBeforeUnmount(() => {
            document.body.style.overflow = "";
            refs.main && node.remove("ui-modals", refs.main);
        });

        // 导出公共方法
        expose({ ...composable.methods });

        return {
            ...composable.methods,
            ...composable.computeds,
            ...toRefs(refs),
        };
    },
});
</script>
