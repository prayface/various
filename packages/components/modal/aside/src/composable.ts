import { ref, computed, SetupContext } from "vue";
import { gsap } from "gsap";
import { UiModalAsideEmits, UiModalAsideProps } from "../index";
import { utility } from "@various/utils";

export default (define: UiModalAsideProps, emit: SetupContext<typeof UiModalAsideEmits>["emit"]) => {
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
                width: utility.isNumber(define.width) ? define.width + "px" : define.width,
                padding: define.spacing,
            };
        }),
    };

    //* 函数列表
    const methods = {
        //* Modal关闭函数
        closeModal: () => {
            //* 隐藏弹出窗口
            refs.open.value = false;
            //* 响应关闭事件
            emit("close");
            //* Body显示被隐藏的滚动条
            document.body.style.overflow = "";
            if (document.body.scrollHeight > document.body.offsetHeight) {
                document.body.style.paddingRight = "";
            }
        },

        //* Modal启动函数
        openModal: () => {
            //* 回到顶部
            refs.container.value?.scrollTo({ top: 0 });
            //* 显示弹出窗口
            refs.open.value = true;
            //* 响应Open事件
            emit("open");
            //* Body隐藏滚动条
            document.body.style.overflow = "hidden";
            if (document.body.scrollHeight > document.body.offsetHeight) {
                document.body.style.paddingRight = "12px";
            }
        },

        //* Modal滚动条函数
        scrollTo: (options: ScrollToOptions) => {
            refs.container.value?.scrollTo(options);
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
