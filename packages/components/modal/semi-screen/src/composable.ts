import { ref, computed, nextTick, SetupContext } from "vue";
import { UiModalSemiScreenEmits, UiModalSemiScreenProps } from "../index";
import { utility } from "@various/utils";

export default (define: UiModalSemiScreenProps, emit: SetupContext<typeof UiModalSemiScreenEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        open: ref<boolean>(false),
        main: ref<HTMLElement>(),
        observer: ref<ResizeObserver>(),
        container: ref<HTMLElement>(),
    };

    //* 计算属性
    const computeds = {
        //* 主体样式
        mainStyle: computed(() => {
            return {
                padding: `${define.margin}px 0`,
                zIndex: define.zIndex,
            };
        }),
        //* 容器样式
        containerStyle: computed(() => {
            //* 初始化返回数据
            const result: { [name: string]: any } = {
                width: utility.isNumber(define.width) ? define.width + "px" : define.width,
                padding: define.spacing,
            };

            return result;
        }),
    };

    //* 函数列表
    const methods = {
        //* 窗口初始化函数
        resizeHandler: () => {
            nextTick(() => {
                if (!refs.container.value || !refs.main.value) return;
                if (refs.container.value.offsetHeight >= window.innerHeight) {
                    refs.main.value.style.alignItems = "flex-start";
                } else {
                    refs.main.value.style.alignItems = "center";
                }
            });
        },

        //* Modal关闭函数
        closeModal: () => {
            //* 检测是否满足运行条件
            if (!refs.main.value || !refs.observer.value) return;
            else {
                //* Body显示被隐藏的滚动条
                document.body.style.overflow = "";
                //* 卸载监听事件
                refs.observer.value.disconnect();
                //* 隐藏弹出窗口
                refs.open.value = false;
                //* 响应关闭事件
                emit("close");
            }
        },

        //* Modal启动函数
        openModal: () => {
            //* 检测是否满足运行条件
            if (!refs.main.value || !refs.observer.value) return;
            else {
                //* Body隐藏滚动条
                document.body.style.overflow = "hidden";
                //* 回到顶部
                refs.container.value?.scrollTo({ top: 0 });
                //* 挂载监听事件
                refs.observer.value.observe(refs.main.value);
                //* 显示弹出窗口
                refs.open.value = true;
                //* 响应Open事件
                emit("open");
            }
        },

        //* Modal滚动条函数
        scrollTo: (options: ScrollToOptions) => {
            refs.container.value?.scrollTo(options);
        },
    };

    return { refs, methods, computeds };
};
