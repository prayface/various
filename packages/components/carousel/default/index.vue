<template>
    <div class="ui-carousel" :style="style" ref="main" v-bind="attrs">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-carousel-control ui-carousel-left-control" @click="switchCarousel(active - 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-carousel-control ui-carousel-right-control" @click="switchCarousel(active + 1)" v-if="arrow != 'never'">
            <UiIcon name="arrow" />
        </div>

        <!-- 轮播图分页器 -->
        <div class="ui-carousel-schedules" v-if="pagination">
            <template v-for="(value, index) in childrens">
                <div class="ui-carousel-schedule" :class="{ active: index == active }" @click="switchCarousel(index, value)"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiCarouselPropsOption, UiCarouselEmits } from "./index";
import { useComposable } from "./src/composable";
import { onMounted, onBeforeUnmount } from "vue";

//* 组件引入
import UiIcon from "@various/components/icon";

//* 获取组件属性
const define = defineProps(UiCarouselPropsOption);
const emits = defineEmits(UiCarouselEmits);

const { refs, watchs, methods, computeds } = useComposable(define, emits);
const { main, active, container, childrens } = refs;
const { switchCarousel } = methods;
const { style, attrs } = computeds;

//* 挂载函数
onMounted(() => methods.init());

//* 卸载函数
onBeforeUnmount(() => {
    refs.autoTimer.value && clearInterval(refs.autoTimer.value);
    watchs.stopAutoPlay && watchs.stopAutoPlay();
});

//* 组件配置
defineOptions({ name: "UiCarousel" });
//* 导出函数
defineExpose({
    init: methods.init,
    cutCarousel: switchCarousel,
    triggerNext: () => switchCarousel(active.value + 1),
    triggerBack: () => switchCarousel(active.value - 1),
});
</script>
