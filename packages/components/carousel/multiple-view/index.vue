<template>
    <div class="ui-mv-carousel" :style="style" ref="main" v-bind="attrs">
        <!-- 轮播图容器, 用来控制轮播滚动 -->
        <div class="ui-mv-carousel-container" ref="container">
            <slot></slot>
        </div>

        <!-- 轮播图左侧箭头 -->
        <div class="ui-mv-carousel-control ui-mv-carousel-left-control" @click="switchCarousel(-1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
        <!-- 轮播图右侧箭头 -->
        <div class="ui-mv-carousel-control ui-mv-carousel-right-control" @click="switchCarousel(1)" v-if="arrow != 'never' && controls">
            <UiIcon name="arrow" />
        </div>
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
const { refs, methods, computeds } = useComposable(define, emits);
const { main, controls, container } = refs;
const { switchCarousel } = methods;
const { style, attrs } = computeds;

//* 挂载函数
onMounted(() => {
    //* 检测是否向下执行
    if (!main.value) return;
    else {
        //* 初始化函数
        methods.init();
        //* 当窗口尺寸发送变化时, 触发初始化函数
        main.value.onresize = () => methods.init();
    }
});

//* 卸载函数
onBeforeUnmount(() => {
    refs.autoTimer.value && clearInterval(refs.autoTimer.value);
    main.value && (main.value.onresize = null);
});

//* 组件配置
defineOptions({ name: "UiCarouselMultipleView" });
//* 函数导出
defineExpose({
    init: methods.init,
    cutCarousel: switchCarousel,
    triggerNext: () => switchCarousel(1),
    triggerBack: () => switchCarousel(-1),
});
</script>
