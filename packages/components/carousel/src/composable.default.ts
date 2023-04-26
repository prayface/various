import { watch } from "vue";
import { UiCarouselProps } from "./carousel";
import { gsap } from "gsap";

export type UiCarouselConstructorRefs = {
    main?: HTMLDivElement;
    container?: HTMLDivElement;
    childrens?: HTMLElement[];
    autoTimer?: NodeJS.Timer;
    skipTimer: Boolean;
    active: number;
};

export default class {
    refs;
    delay;
    watchs;
    methods;

    constructor(refs: UiCarouselConstructorRefs, define: UiCarouselProps) {
        this.refs = refs;
        this.delay = define.transitionDelay / 1000;
        this.methods = this.#useMethods(define);
        this.watchs = this.#useWatch(define);
    }

    #useWatch(define: UiCarouselProps) {
        const stopAutoPlayHanlder = () => {
            this.refs.autoTimer = setTimeout(() => this.methods.cutCarousel(this.refs.active + 1), define.delay);
        };

        return {
            stopAutoPlay: watch(() => define.autoplay, stopAutoPlayHanlder, {
                immediate: true,
            }),
        };
    }

    #useMethods(define: UiCarouselProps) {
        //* 初始化函数
        const init = () => {
            //* 获取模块容器失败则取消后续操作
            if (!this.refs.container || !this.refs.container?.children?.length) return;

            //* 初始化childrens
            this.refs.childrens = [];

            //* 缓存node节点
            for (let i = 0; i < this.refs.container.children.length; i++) {
                this.refs.childrens.push(this.refs.container.children[i] as HTMLElement);
            }

            //* 显示当前轮播图
            if (this.refs.childrens[this.refs.active]) {
                gsap.set(this.refs.childrens[this.refs.active], { xPercent: -100, position: "relative" });
            }
        };

        //* 切换轮播图
        const cutCarousel = (number: number, data?: any) => {
            //* 获取轮播图列表长度
            const count = this.refs.childrens?.length || 0;

            //* 检测是否满足运行条件
            if (!this.refs.container || this.refs.skipTimer || count <= 1) return;

            //* 停止自动播放动画的定时器
            this.refs.autoTimer && clearTimeout(this.refs.autoTimer);

            //* 激活禁用切换
            this.refs.skipTimer = true;

            //* 轮播图触边处理
            if (number >= count || number < 0) {
                //* 未开启无限滚动则取消操作
                if (!define.loop) return;

                //* 轮播图到达最后一页
                if (number >= count) {
                    cutCarouselTransform(this.refs.active, 0, true);
                } else if (number < 0) {
                    cutCarouselTransform(this.refs.active, count - 1, false);
                }
            } else {
                cutCarouselTransform(this.refs.active, number);
            }
        };

        //* 切换轮播图过渡
        const cutCarouselTransform = (current: number, ready: number, next?: boolean) => {
            //* 检测是否存在轮播内容
            if (!this.refs.childrens?.[current] || !this.refs.childrens?.[ready]) return;
            else {
                this.refs.active = ready;
            }

            //* 缓存轮播图内容节点
            const currentNode = this.refs.childrens[current];
            const readyNode = this.refs.childrens[ready];

            //* 判断候选内容入场方向
            const is = next == undefined ? current < ready : next;

            //* 设置候选内容入场前位置
            gsap.set(readyNode, { xPercent: is ? 0 : -200 });

            //* 创建过渡动画时间线
            const timeline = gsap.timeline();

            //* 入场动画
            timeline.to(readyNode, {
                position: "relative",
                duration: this.delay,
                xPercent: -100,
            });

            //* 离场动画配置
            const leave = {
                position: "absolute",
                duration: this.delay,
                xPercent: is ? -200 : 0,
                onComplete: () => {
                    //* 重置离场节点位置
                    gsap.set(currentNode, { xPercent: 0 });

                    //* 删除剩余动画效果
                    timeline.kill();

                    //* 自动播放
                    if (define.autoplay) {
                        this.refs.autoTimer = setTimeout(() => this.methods.cutCarousel(this.refs.active + 1), define.delay);
                    }

                    //* 关闭禁用切换
                    this.refs.skipTimer = false;
                },
            };

            //* 离场动画
            timeline.to(currentNode, leave, "<");
        };

        return {
            init,
            cutCarousel,
            triggerNext: () => cutCarousel(this.refs.active + 1),
            triggerBack: () => cutCarousel(this.refs.active - 1),
        };
    }
}
