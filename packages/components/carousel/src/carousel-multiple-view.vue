<template>
    <div class="ui-carousel ui-multiple-view-carousel" :style="style" ref="main" v-bind="attrs">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-carousel-control ui-carousel-left-control" @click="cutCarousel(-1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-carousel-control ui-carousel-right-control" @click="cutCarousel(1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount, reactive, defineComponent, toRefs } from "vue";
import { UiCarouselMultipleViewPropsOption } from "./carousel";
import Composable from "./composable";
import ComposableDefault, { UiCarouselConstructorRefs } from "./composable.multiple-view";

import UiIcon from "@various/components/icon";

export default defineComponent({
    name: "UiCarouselMultipleView",
    components: { UiIcon },
    props: UiCarouselMultipleViewPropsOption,
    setup(define, { expose }) {
        //* 初始化响应式变量
        const refs = reactive<UiCarouselConstructorRefs>({
            main: undefined,
            container: undefined,
            skipTimer: undefined,
            autoTimer: undefined,
            controls: false,
        });

        //* 实例化响应式变量
        const composable = new Composable(define);
        const composableDefault = new ComposableDefault(refs, define);

        //* 挂载函数
        onMounted(() => {
            //* 检测是否向下执行
            if (!refs.main) return;
            //* 初始化函数
            composableDefault.methods.init();
            //* 当窗口尺寸发送变化时, 触发初始化函数
            refs.main.onresize = () => composableDefault.methods.init();
        });

        //* 卸载函数
        onBeforeUnmount(() => {
            refs.skipTimer && clearTimeout(refs.skipTimer);
            refs.autoTimer && clearInterval(refs.autoTimer);
            refs.main && (refs.main.onresize = null);
        });

        //* 导出函数
        expose({ ...composableDefault.methods });

        return {
            ...toRefs(refs),
            ...composable.computeds,
            ...composableDefault.methods,
        };
    },
});
</script>
