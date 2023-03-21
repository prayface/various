<template>
    <div class="ui-scrollbar" ref="container" :style="style">
        <div class="ui-scrollbar-content" ref="content" :style="stylesContent">
            <slot></slot>
        </div>
        <div class="ui-scrollbar-container ui-scrollbar-x" v-show="scrollbarX.size">
            <div class="ui-scrollbar-bar" :style="stylesScrollbarX" @mousedown="onScroll(true, $event)"></div>
        </div>
        <div class="ui-scrollbar-container ui-scrollbar-y" v-show="scrollbarY.size">
            <div class="ui-scrollbar-bar" :style="stylesScrollbarY" @mousedown="onScroll(false, $event)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Composable from "./composable";
import { defineComponent,computed, onMounted, ref } from "vue";
import { UiScrollPropsOption } from "./scrollbar";
export default defineComponent({
    name: "UiSeamlessScroll",
    props: UiScrollPropsOption,
    setup(define, { expose }) {
        const scroll = ref({ real: { top: 0, left: 0 }, abs: { top: 0, left: 0 }, drag: false });
        const scrollbarX = ref({ size: 0, offset: 0, drag: false });
        const scrollbarY = ref({ size: 0, offset: 0, drag: false });
        const container = ref<HTMLDivElement | null>();
        const content = ref<HTMLDivElement | null>();

        //* 实例化组合类
        const composable = new Composable(define);

        // const { style } = composable.computeds;
        const { dispostSize, dispostWheel } = composable.methods;

        //* 滚动条内容样式
        const stylesContent = computed(() => {
            return {
                transition: scroll.value.drag ? "none" : "all 0.2s",
                transform: `translate(-${scroll.value.real.left}px, -${scroll.value.real.top}px)`,
            };
        });
        //* X轴滑块样式
        const stylesScrollbarX = computed(() => {
            return {
                left: `${scrollbarX.value.offset}px`,
                width: `${scrollbarX.value.size}px`,
                transform: `translateX(${scroll.value.abs.left}px)`,
                transition: scrollbarX.value.drag ? "none" : "all 0.2s",
            };
        });
        //* Y轴滑块样式
        const stylesScrollbarY = computed(() => {
            return {
                top: `${scrollbarY.value.offset}px`,
                height: `${scrollbarY.value.size}px`,
                transform: `translateY(${scroll.value.abs.top}px)`,
                transition: scrollbarY.value.drag ? "none" : "all 0.2s",
            };
        });

        // 真实尺寸、 相对尺寸、 转换比例
        const real = { width: 0, height: 0, ratioX: 0, ratioY: 0 };
        const abs = { width: 0, height: 0, ratioX: 0, ratioY: 0 };
        //* 初始化样式
        const init = () => {
            if (content.value && container.value) {
                //* 1. 获取内容的尺寸
                const contentRect = content.value.getBoundingClientRect();
                real.height = contentRect.height;
                real.width = contentRect.width;
                //* 2. 获取容器的尺寸
                const containerRect = container.value.getBoundingClientRect();
                abs.height = containerRect.height;
                abs.width = containerRect.width;
                //* 3. 计算各自的转换比例
                real.ratioY = abs.height / real.height;
                real.ratioX = abs.width / real.width;
                abs.ratioY = real.height / abs.height;
                abs.ratioX = real.width / abs.width;
                //* 4. 计算不同方向滚动条的尺寸和偏移
                scrollbarX.value = dispostSize(real.width, abs.width, real.ratioX);
                scrollbarY.value = dispostSize(real.height, abs.height, real.ratioY);
                //* 5. 存在Y轴滚动条时挂载wheel事件
                if (scrollbarY.value.size) {
                    container.value.onwheel = (ev: WheelEvent) => {
                        const offsetY = dispostWheel(scroll.value.real.top + ev.deltaY, abs.height, real.height);
                        if (scroll.value.real.top != offsetY) {
                            scroll.value.real.top = dispostWheel(scroll.value.real.top + ev.deltaY, abs.height, real.height);
                            scroll.value.abs.top = scroll.value.real.top * real.ratioY;
                            ev.preventDefault();
                        }
                    };
                }
            }
        };

        //* 响应滚动条滑块拖动事件
        const onScroll = (is: boolean, ev: MouseEvent) => {
            scroll.value.drag = true;
            const size = is ? ev.x : ev.y;
            const offset = is ? scroll.value.abs.left : scroll.value.abs.top;
            document.onselectstart = () => false;
            document.onmousemove = (ev: MouseEvent) => {
                if (is) {
                    scrollbarX.value.drag = true;
                    scroll.value.abs.left = dispostWheel(offset + ev.x - size, scrollbarX.value.size, abs.width);
                    scroll.value.real.left = scroll.value.abs.left * abs.ratioX;
                } else {
                    scrollbarY.value.drag = true;
                    scroll.value.abs.top = dispostWheel(offset + ev.y - size, scrollbarY.value.size, abs.height);
                    scroll.value.real.top = scroll.value.abs.top * abs.ratioY;
                }
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                scroll.value.drag = false;
                if (is) scrollbarX.value.drag = false;
                else scrollbarY.value.drag = false;
            };
        };

        //* 初始化
        onMounted(() => init());

        return{
            ...composable.computeds,
            stylesContent,
            stylesScrollbarX,
            stylesScrollbarY,
            scrollbarX,
            scrollbarY,
            onScroll
        }
    },
});
</script>
