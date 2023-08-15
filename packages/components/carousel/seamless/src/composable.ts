import { computed, ref } from "vue";
import { UiCarouselSeamlessProps } from "../index";
import { utility } from "@various/utils";

export const useComposable = (define: UiCarouselSeamlessProps) => {
    //* 播放间隔
    const delay = define.delay / 1000;

    //* 响应式变量
    const refs = {
        offset: ref<number>(0),
        frame: ref<number>(),
        main: ref<HTMLDivElement>(),
        content: ref<HTMLDivElement>(),
        container: ref<HTMLDivElement>(),
    };

    //* 函数列表
    const methods = {
        //* 绘制动画
        animation: () => {
            //* 判断是否向下执行
            if (!refs.container.value || !refs.content.value || !refs.main.value) return;
            if (refs.offset.value >= refs.content.value.offsetWidth) {
                refs.offset.value = 0;
            } else {
                refs.offset.value += delay;
            }

            //* 绘制
            refs.container.value.style.transform = `translateX(-${refs.offset.value}px)`;
            //* 触发下一帧绘制
            refs.frame.value = window.requestAnimationFrame(methods.animation);
        },

        //* 鼠标移入事件
        mouseenter: () => {
            refs.frame.value && window.cancelAnimationFrame(refs.frame.value);
        },

        //* 鼠标移出事件
        mouseleave: () => {
            //* 判断是否向下执行
            if (!refs.container.value || !refs.content.value || !refs.main.value) return;
            else {
                refs.frame.value = window.requestAnimationFrame(methods.animation);
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* 标签样式
        style: computed(() => {
            //* 高度处理
            if (utility.isNumber(define.height)) return { height: define.height + "px" };
            else {
                return { height: define.height };
            }
        }),
    };

    return { refs, methods, computeds };
};
