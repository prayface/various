import { ref, computed } from "vue";
import { gsap } from "gsap";

import _ from "lodash";

import { UiModalAsideEmits, UiModalAsideProps } from "../index";
import { UiEmitFn } from "@various/constants";

export default (define: UiModalAsideProps, emit: UiEmitFn<typeof UiModalAsideEmits>) => {
    //* 响应式变量
    const refs = {
        open: ref<boolean>(false),
        main: ref<HTMLElement>(),
        observer: ref<ResizeObserver>(),
        container: ref<HTMLElement>(),
    };

    //* 计算属性
    const computeds = {
        //* 容器样式
        style: computed(() => {
            return {
                width: _.isNumber(define.width) ? define.width + "px" : define.width,
                padding: define.spacing,
            };
        }),
    };

    //* 函数列表
    const methods = {
        //* Modal关闭函数
        closeModal: () => {
            //* Body显示被隐藏的滚动条
            document.body.style.overflow = "";
            //* 隐藏弹出窗口
            refs.open.value = false;
            //* 响应关闭事件
            emit("close");
        },

        //* Modal启动函数
        openModal: () => {
            //* Body隐藏滚动条
            document.body.style.overflow = "hidden";
            //* 显示弹出窗口
            refs.open.value = true;
            //* 响应Open事件
            emit("open");
        },

        //* 入场前样式调整
        entrancePreAnimation: (el: Element) => {
            if (refs.container.value) {
                gsap.set(refs.container.value, { opacity: 0, xPercent: 100 });
            }
        },

        //* 入场动画
        entranceAnimation: (el: Element, done: () => void) => {
            if (refs.container.value) {
                gsap.to(refs.container.value, { duration: 0.5, opacity: 1, xPercent: 0, onComplete: () => done() });
            }
        },

        //* 离场动画
        departureAnimation: (el: Element, done: () => void) => {
            if (refs.container.value) {
                gsap.to(refs.container.value, { duration: 0.5, opacity: 0, xPercent: 100, onComplete: () => done() });
            }
        },
    };

    return { refs, methods, computeds };
};
