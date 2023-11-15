import { gsap } from "gsap";
import { SetupContext, computed, ref, watch } from "vue";
import { UiCarouselProps, UiCarouselEmits } from "../index";
import { utility } from "@various/utils";

export const useComposable = (define: UiCarouselProps, emits: SetupContext<typeof UiCarouselEmits>["emit"]) => {
    //* 静态变量
    const variable = {
        delay: define.transitionDelay / 1000,
        observer: undefined as ResizeObserver | undefined,
    };

    //* 响应式变量
    const refs = {
        main: ref<HTMLElement>(), //* 轮播图组件的主体
        container: ref<HTMLElement>(), //* 轮播图组件列表的容器
        childrens: ref<HTMLElement[]>([]), //* 轮播图组件列表
        autoTimer: ref<NodeJS.Timeout>(), //* 轮播图组件自动播放定时器
        skipTimer: ref<Boolean>(false), //* 轮播图组件是否正在跳转中
        active: ref<number>(0), //* 轮播图组件当前激活的列表项
    };

    //* 工具函数
    const utils = {
        //* 切换动画
        switch: (current: number, ready: number, option?: { notEmit?: boolean; next?: boolean; set?: boolean }) => {
            //* 检测是否存在轮播内容
            if (!refs.container.value || !refs.childrens.value?.[current] || !refs.childrens.value?.[ready]) return;
            else {
                refs.active.value = ready;
            }

            //* 触发change回调
            !option?.notEmit && emits("change", refs.active.value);

            //* 缓存轮播图内容节点
            const currentNode = refs.childrens.value[current];
            const readyNode = refs.childrens.value[ready];

            //* 初始化容器尺寸
            const size = refs.container.value.clientWidth;

            //* 设置候选内容入场前位置
            if (option?.set) {
                gsap.set(readyNode, { translateX: option?.next ? `${-2 * size}px` : 0 });
            }

            //* 创建过渡动画时间线
            const timeline = gsap.timeline();
            //* 离场动画配置
            const leave = {
                position: "absolute",
                duration: variable.delay,
                translateX: option?.next ? 0 : `${-2 * size}px`,
                onComplete: () => {
                    //* 重置离场节点位置
                    gsap.set(currentNode, { translateX: 0 });

                    //* 删除剩余动画效果
                    timeline.kill();

                    //* 自动播放
                    if (define.autoplay) {
                        refs.autoTimer.value = setTimeout(() => methods.switchCarousel(refs.active.value + 1), define.delay);
                    }

                    //* 关闭禁用切换
                    refs.skipTimer.value = false;

                    //* 触发change-after回调
                    !option?.notEmit && emits("change-after", refs.active.value);
                },
            };

            //* 入场动画
            timeline.to(readyNode, { position: "relative", duration: variable.delay, translateX: `${-1 * size}px` });

            //* 离场动画
            timeline.to(currentNode, leave, "<");
        },

        //* 自动播放回调
        autoplayHandler: () => {
            refs.autoTimer.value && clearTimeout(refs.autoTimer.value);
            refs.autoTimer.value = setTimeout(() => {
                refs.autoTimer.value = undefined;
                if (define.autoplay) {
                    methods.switchCarousel(refs.active.value + 1);
                }
            }, define.delay);
        },
    };

    //* 侦听器列表
    const watchs = {
        stopAutoPlay: watch(() => define.autoplay, utils.autoplayHandler, {
            immediate: true,
        }),
    };

    //* 函数列表
    const methods = {
        //* 初始化函数
        init: () => {
            //* 获取模块容器失败则取消后续操作
            if (!refs.container.value || !refs.container.value?.children?.length) return;
            else {
                //* 初始化并缓存轮播图组件列表
                refs.childrens.value = [];
                for (let i = 0; i < refs.container.value.children.length; i++) {
                    refs.childrens.value.push(refs.container.value.children[i] as HTMLElement);
                }

                //* 显示轮播图组件当前激活的列表项
                if (refs.childrens.value[refs.active.value]) {
                    gsap.set(refs.childrens.value[refs.active.value], {
                        translateX: `${-1 * refs.container.value.clientWidth}px`,
                        position: "relative",
                    });
                }
            }
        },

        //* 拖拽函数
        dragCarousel: (ev: MouseEvent) => {
            //* 轮播图组件列表长度
            const count = refs.childrens.value.length || 0;
            //* 检测是否满足运行条件
            if (!refs.container.value || refs.skipTimer.value || count <= 1) return;

            //* 关闭自动播放的定时器
            refs.autoTimer.value && clearTimeout(refs.autoTimer.value);
            //* 禁用切换函数
            refs.skipTimer.value = true;

            //* 初始化鼠标位置
            const initPos = ev.clientX;
            //* 初始化容器尺寸
            const size = refs.container.value?.clientWidth || 0;
            //* 初始化拖拽配置
            const option = {
                next: 1, //* 拖拽方向[1 = 左, -1 = 右],
                ready: -1, //* 候场的HTML NODE Key
                offset: 0, //* 拖拽距离
                current: refs.active.value, //* 退场的HTML NODE Key
            };

            //* 触发拖拽前的事件
            emits("drag-after");

            //* 鼠标移动事件注册
            document.onmousemove = (ev) => {
                //* 初始化方向与距离
                option.next = ev.clientX < initPos ? -1 : 1;
                option.offset = ev.clientX - initPos;

                //* 拖拽距离最多不超过一屏
                if (Math.abs(option.offset) > size) {
                    option.offset = size * option.next;
                }

                //* 获取候场的HTML Node
                if (ev.clientX > initPos && refs.active.value == 0) {
                    option.ready = count - 1;
                } else if (ev.clientX < initPos && refs.active.value == count - 1) {
                    option.ready = 0;
                } else {
                    option.ready = refs.active.value - option.next;
                }

                //* 设置位置
                if (refs.childrens.value[option.current] && refs.childrens.value[option.ready]) {
                    gsap.set(refs.childrens.value[option.current], { translateX: `${option.offset + -1 * size}px` });
                    gsap.set(refs.childrens.value[option.ready], { translateX: `${option.offset + (option.next > 0 ? -2 * size : 0)}px` });
                }
            };

            //* 鼠标松开事件注册
            document.onmouseup = () => {
                //* 清除注册的文档事件
                document.onmouseup = null;
                document.onmousemove = null;

                //* 触发拖拽前的事件
                emits("drag");

                if (option.offset != 0) {
                    //* 禁用a链接的点击事件
                    document.onclick = (ev) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        document.onclick = null;
                    };

                    //* 当拖拽距离小于容器尺寸的30%时, 回退位置
                    if (Math.abs(option.offset) <= size * 0.3) {
                        utils.switch(option.ready, option.current, { next: option.next < 0, notEmit: true });
                    } else {
                        utils.switch(option.current, option.ready, { next: option.next > 0 });
                    }
                } else {
                    //* 关闭禁用切换
                    refs.skipTimer.value = false;
                    //* 自动播放
                    if (define.autoplay) {
                        refs.autoTimer.value = setTimeout(() => methods.switchCarousel(refs.active.value + 1), define.delay);
                    }
                }
            };

            //* 禁用鼠标默认事件
            ev.preventDefault();
        },

        //* 切换函数
        switchCarousel: (number: number, _data?: any) => {
            //* 轮播图组件列表长度
            const count = refs.childrens.value.length || 0;
            //* 检测是否满足运行条件
            if (!refs.container.value || refs.skipTimer.value || count <= 1 || number == refs.active.value) return;
            else {
                //* 关闭自动播放的定时器
                refs.autoTimer.value && clearTimeout(refs.autoTimer.value);
                //* 禁用切换函数
                refs.skipTimer.value = true;

                //* 轮播图触边处理
                if (number >= count || number < 0) {
                    //* 轮播图到达最后一页
                    if (number >= count) {
                        utils.switch(refs.active.value, 0, { set: true });
                    } else if (number < 0) {
                        utils.switch(refs.active.value, count - 1, { set: true, next: true });
                    }
                } else {
                    utils.switch(refs.active.value, number, { set: true, next: refs.active.value > number });
                }
            }
        },

        //* 切换函数（上）
        switchBack: () => methods.switchCarousel(refs.active.value - 1),

        //* 切换函数（下）
        switchNext: () => methods.switchCarousel(refs.active.value + 1),
    };

    //* 计算属性
    const computeds = {
        //* 主体类名
        className: computed(() => `ui-carousel-${define.arrow}`),
        style: computed(() => {
            //* 初始化返回列表
            const result: { [name: string]: any } = {};

            //* 宽度处理
            if (define.width) {
                if (utility.isNumber(define.width)) result.width = define.width + "px";
                else result.width = define.width;
            }

            //* 高度处理
            if (define.height) {
                if (utility.isNumber(define.height)) result.height = define.height + "px";
                else result.height = define.height;
            }

            return result;
        }),

        //* 是否显示左侧控制按钮
        isFirstControl: computed(() => {
            return define.arrow != "never";
        }),

        //* 是否显示右侧控制按钮
        isLastControl: computed(() => {
            return define.arrow != "never";
        }),

        //* 容器的处理函数
        containerHandler: computed(() => {
            if (define.drag) {
                return {
                    mousedown: methods.dragCarousel,
                };
            } else {
                return {};
            }
        }),
    };

    return { refs, watchs, methods, computeds, variable };
};
