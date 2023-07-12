import _ from "lodash";
import { gsap } from "gsap";
import { SetupContext, computed, ref, watch } from "vue";
import { UiCarouselProps, UiCarouselEmits } from "../index";

export const useComposable = (define: UiCarouselProps, emits: SetupContext<typeof UiCarouselEmits>["emit"]) => {
    //* 静态变量
    const variable = {
        delay: define.transitionDelay / 1000,
    };

    //* 响应式变量
    const refs = {
        main: ref<HTMLElement>(), //* 轮播图组件的主体
        container: ref<HTMLElement>(), //* 轮播图组件列表的容器
        childrens: ref<HTMLElement[]>([]), //* 轮播图组件列表
        autoTimer: ref<NodeJS.Timer>(), //* 轮播图组件自动播放定时器
        skipTimer: ref<Boolean>(false), //* 轮播图组件是否正在跳转中
        active: ref<number>(0), //* 轮播图组件当前激活的列表项
    };

    //* 工具函数
    const utils = {
        //* 切换动画
        switch: (current: number, ready: number, next?: boolean) => {
            //* 检测是否存在轮播内容
            if (!refs.childrens.value?.[current] || !refs.childrens.value?.[ready]) return;
            else {
                refs.active.value = ready;
            }

            //* 触发change回调
            emits("change", refs.active.value);

            //* 缓存轮播图内容节点
            const currentNode = refs.childrens.value[current];
            const readyNode = refs.childrens.value[ready];

            //* 判断候选内容入场方向
            const is = next == undefined ? current < ready : next;
            //* 创建过渡动画时间线
            const timeline = gsap.timeline();
            //* 离场动画配置
            const leave = {
                position: "absolute",
                duration: variable.delay,
                xPercent: is ? -200 : 0,
                onComplete: () => {
                    //* 重置离场节点位置
                    gsap.set(currentNode, { xPercent: 0 });

                    //* 删除剩余动画效果
                    timeline.kill();

                    //* 自动播放
                    if (define.autoplay) {
                        refs.autoTimer.value = setTimeout(() => methods.switchCarousel(refs.active.value + 1), define.delay);
                    }

                    //* 关闭禁用切换
                    refs.skipTimer.value = false;

                    //* 触发change-after回调
                    emits("change-after", refs.active.value);
                },
            };

            //* 设置候选内容入场前位置
            gsap.set(readyNode, { xPercent: is ? 0 : -200 });

            //* 入场动画
            timeline.to(readyNode, { position: "relative", duration: variable.delay, xPercent: -100 });

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
                    gsap.set(refs.childrens.value[refs.active.value], { xPercent: -100, position: "relative" });
                }
            }
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
                        utils.switch(refs.active.value, 0, true);
                    } else if (number < 0) {
                        utils.switch(refs.active.value, count - 1, false);
                    }
                } else {
                    utils.switch(refs.active.value, number);
                }
            }
        },
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
                if (_.isNumber(define.width)) result.width = define.width + "px";
                else result.width = define.width;
            }

            //* 高度处理
            if (define.height) {
                if (_.isNumber(define.height)) result.height = define.height + "px";
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
    };

    return { refs, watchs, methods, computeds };
};
