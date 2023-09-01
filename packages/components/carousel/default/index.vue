<template>
    <div class="ui-carousel" :class="className" :style="style" ref="main">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-carousel-container" ref="container" v-on="containerHandler">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <slot name="arrow-back" v-if="isFirstControl">
            <div class="ui-carousel-control ui-carousel-left-control" @click="switchCarousel(active - 1)">
                <UiIcon name="arrow" />
            </div>
        </slot>

        <!-- 轮播图右侧箭头 -->
        <slot name="arrow-next" v-if="isLastControl">
            <div class="ui-carousel-control ui-carousel-right-control" @click="switchCarousel(active + 1)">
                <UiIcon name="arrow" />
            </div>
        </slot>

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

const { refs, watchs, methods, computeds, variable } = useComposable(define, emits);
const { main, active, container, childrens } = refs;
const { switchCarousel, switchBack, switchNext, init } = methods;
const { style, className, isLastControl, isFirstControl, containerHandler } = computeds;

//* 挂载函数
onMounted(() => {
    variable.observer = new ResizeObserver(() => methods.init());
    if (main.value) {
        variable.observer.observe(main.value);
    }
});

//* 卸载函数
onBeforeUnmount(() => {
    //* 注销挂载的Observer
    variable.observer && variable.observer.disconnect();
    //* 清除残留的定时器
    refs.autoTimer.value && clearInterval(refs.autoTimer.value);
    //* 清除侦听器
    watchs.stopAutoPlay && watchs.stopAutoPlay();
});

//* 组件配置
defineOptions({ name: "UiCarousel" });
//* 导出函数
defineExpose({ init, switchBack, switchNext, switchCarousel });
</script>
