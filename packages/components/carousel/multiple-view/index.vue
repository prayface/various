<template>
    <div class="ui-mv-carousel" :class="className" :style="style">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-mv-carousel-main" ref="main">
            <div class="ui-mv-carousel-container" ref="container">
                <slot></slot>
            </div>
        </div>

        <!-- 轮播图左侧箭头 -->
        <slot name="arrow-back" v-if="isFirstControl">
            <div class="ui-mv-carousel-control ui-mv-carousel-left-control" @click="switchCarousel(-1)">
                <UiIcon name="arrow" />
            </div>
        </slot>

        <!-- 轮播图右侧箭头 -->
        <slot name="arrow-next" v-if="isLastControl">
            <div class="ui-mv-carousel-control ui-mv-carousel-right-control" @click="switchCarousel(1)">
                <UiIcon name="arrow" />
            </div>
        </slot>
    </div>
</template>

<script lang="ts" setup>
//* 资源引入
import { UiCarouselMultipleViewPropsOption, UiCarouselMultipleViewEmits } from "./index";
import { useComposable } from "./src/composable";
import { onMounted, onBeforeUnmount } from "vue";

//* 组件引入
import UiIcon from "@various/components/icon";

//* 获取组件属性
const define = defineProps(UiCarouselMultipleViewPropsOption);
const emits = defineEmits(UiCarouselMultipleViewEmits);

//* 组合函数
const { refs, methods, computeds, variable } = useComposable(define, emits);
const { main, container } = refs;
const { switchCarousel, switchBack, switchNext, init } = methods;
const { style, className, isLastControl, isFirstControl } = computeds;

//* 挂载函数
onMounted(() => {
    //* 检测是否向下执行
    if (!main.value) return;
    else {
        variable.observer = new ResizeObserver(() => methods.init());
        variable.observer.observe(main.value);
    }
});

//* 卸载函数
onBeforeUnmount(() => {
    //* 注销挂载的Observer
    variable.observer && variable.observer.disconnect();
    //* 清除残留的定时器
    refs.autoTimer.value && clearInterval(refs.autoTimer.value);
});

//* 组件配置
defineOptions({ name: "UiCarouselMultipleView" });
//* 函数导出
defineExpose({ init, switchBack, switchNext, switchCarousel });
</script>
