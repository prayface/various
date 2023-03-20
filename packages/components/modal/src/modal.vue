<template>
    <Transition>
        <div class="ui-modal" v-show="open" ref="container">
            <div class="ui-modal-container" ref="main" :style="style">
                <!-- 关闭按钮 -->
                <div class="ui-modal-close" v-if="close">
                    <UiIcon name="error" @click="closeModal" />
                </div>

                <!-- 头部信息 -->
                <div class="ui-modal-header">
                    <template v-if="$slots.header"><slot name="header"></slot></template>
                    <template v-else>{{ title }}</template>
                </div>

                <!-- 内容 -->
                <div class="ui-modal-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { UiModalPropsOption, UiModalEmits } from "./modal";
import Composable, { UiModalConstructorRefs } from "./composable";
import { node } from "@various/utils";
import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiModal",
    emits: UiModalEmits,
    props: UiModalPropsOption,
    components: { UiIcon },
    setup(define, { emit, expose }) {
        // 响应式变量
        const container = ref<HTMLDivElement>();
        const refs = reactive<UiModalConstructorRefs>({
            open: false,
        });

        // 实例化工具类
        const composable = new Composable(refs, define, emit);

        onMounted(() => {
            if (!container.value) return;
            node.append("ui-windows", container.value);
        });

        // 导出公共方法
        expose({ ...composable.methods });

        return {
            container,
            ...composable.methods,
            ...composable.computeds,
            ...toRefs(refs),
        };
    },
});
</script>
