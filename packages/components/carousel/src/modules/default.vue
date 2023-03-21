<template>
    <div class="ui-carousel ui-default-carousel" :style="style" ref="main">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-carousel-control ui-carousel-left-control" @click="cutCarousel(active - 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-carousel-control ui-carousel-right-control" @click="cutCarousel(active + 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>

        <!-- 轮播图分页器 -->
        <div class="ui-carousel-schedules" v-if="pagination">
            <template v-for="(value, index) in childrens">
                <div class="ui-carousel-schedule" :class="{ active: index == active }" @click="cutCarousel(index, value)"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from "vue";
import { UiCarouselPropsOption } from "../carousel";
import ComposableDefault, { UiCarouselConstructorRefs } from "./composable.default";
import Composable from "./composable";
import UiIcon from "@various/components/icon";

export default defineComponent({
    components: { UiIcon },
    props: UiCarouselPropsOption,
    setup(define, { expose }) {
        //* 初始化响应式变量
        const refs = reactive<UiCarouselConstructorRefs>({
            main: undefined,
            container: undefined,
            childrens: undefined,
            skipTimer: undefined,
            autoTimer: undefined,
            active: 0,
        });

        //* 实例化响应式变量
        const composable = new Composable(define);
        const composableDefault = new ComposableDefault(refs, define);

        //* 挂载函数
        onMounted(() => composableDefault.methods.init());

        //* 卸载函数
        onUnmounted(() => {
            refs.skipTimer && clearTimeout(refs.skipTimer);
            refs.autoTimer && clearInterval(refs.autoTimer);
            composableDefault.watchs.stopAutoPlay && composableDefault.watchs.stopAutoPlay();
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
