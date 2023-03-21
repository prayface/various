import { watch, WatchStopHandle } from "vue";
import { UiCarouselProps } from "../carousel";

export type UiCarouselConstructorRefs = {
    main?: HTMLDivElement;
    container?: HTMLDivElement;
    childrens?: HTMLElement[];
    skipTimer?: NodeJS.Timer;
    autoTimer?: NodeJS.Timer;
    active: number;
};

export default class {
    refs: UiCarouselConstructorRefs;
    delay: number;
    delayUp: number;

    watchs: {
        stopAutoPlay: WatchStopHandle;
    };

    methods: {
        init: () => void;
        triggerNext: () => void;
        triggerBack: () => void;
        cutCarousel: (number: number, data?: any) => void;
    };

    constructor(refs: UiCarouselConstructorRefs, define: UiCarouselProps) {
        this.refs = refs;
        this.delay = define.transitionDelay / 1000;
        this.delayUp = define.transitionDelay * 1.1;
        this.methods = this.#useMthods(define);
        this.watchs = this.#useWatch(define);
    }

    #useWatch(define: UiCarouselProps) {
        const stopAutoPlayHanlder = () => {
            this.refs.autoTimer = setInterval(() => this.methods.cutCarousel(this.refs.active + 1), define.delay);
        };

        return {
            stopAutoPlay: watch(() => define.autoplay, stopAutoPlayHanlder, {
                immediate: true,
            }),
        };
    }

    #useMthods(define: UiCarouselProps) {
        //? 初始化函数
        const init = () => {
            //* 获取模块容器失败则取消后续操作
            if (!this.refs.main || !this.refs.container || !this.refs.container?.children?.length) return;
            //* 初始化临时变量
            const config = { size: 0 };
            //* 初始化childrens
            this.refs.childrens = [];
            for (let i = 0; i < this.refs.container.children.length; i++) {
                //* 获取node节点
                const node = this.refs.container.children[i] as HTMLElement;
                //* 设置node的偏移
                node.style.transform = `translate3d(${100 * i}%, 0, 0)`;
                //* 偏移量计算
                config.size += node.clientWidth;
                //* 缓存node节点
                this.refs.childrens.push(node);
                //* 调高第一张轮播的层级
                if (i == 0) {
                    node.style.zIndex = "1";
                }
            }

            //* 无限滚动的辅助内容生成
            if (define.loop) {
                const nodeHeader = this.refs.childrens[this.refs.childrens.length - 1].cloneNode(true) as HTMLElement;
                const nodeFooter = this.refs.childrens[0].cloneNode(true) as HTMLElement;
                if (nodeHeader && nodeFooter) {
                    //* 样式调整
                    nodeHeader.style.transform = "translate3d(-100%, 0, 0)";
                    nodeFooter.style.transform = `translate3d(${this.refs.container.children.length * 100}%, 0, 0)`;
                    //* 插入node
                    this.refs.container.insertBefore(nodeHeader, this.refs.childrens[0]);
                    this.refs.container.appendChild(nodeFooter);
                }
            }
        };

        //? 切换轮播图
        const cutCarousel = (number: number, data?: any) => {
            //* 检测是否满足运行条件
            if (!this.refs.container || !this.refs.childrens?.length || this.refs.skipTimer) return;
            //* 无限滚动触边处理
            if (define.loop && (number >= this.refs.childrens.length || number < 0)) {
                this.refs.autoTimer && clearInterval(this.refs.autoTimer);
                this.refs.container.style.transition = `all ${this.delay}s ease-in-out`;
                this.refs.container.style.transform = `translate3d(${number * -100}%, 0, 0)`;
                if (number >= this.refs.childrens.length) {
                    //* 分页器设置
                    this.refs.active = 0;
                    this.refs.skipTimer = setTimeout(() => {
                        this.refs.autoTimer = setInterval(() => cutCarousel(this.refs.active + 1), define.delay);
                        this.refs.skipTimer = undefined;
                        //* 检测是否满足运行条件
                        if (!this.refs.container) return;
                        this.refs.container.style.transition = "none";
                        this.refs.container.style.transform = `translate3d(0, 0, 0)`;
                    }, this.delayUp);
                } else {
                    //* 分页器设置
                    this.refs.active = this.refs.childrens.length - 1;
                    this.refs.skipTimer = setTimeout(() => {
                        this.refs.autoTimer = setInterval(() => cutCarousel(this.refs.active + 1), define.delay);
                        this.refs.skipTimer = undefined;
                        //* 检测是否满足运行条件
                        if (!this.refs.container) return;
                        this.refs.container.style.transition = "none";
                        this.refs.container.style.transform = `translate3d(-${this.refs.active * 100}%, 0, 0)`;
                    }, this.delayUp);
                }

                return;
            }
            //* 触边处理
            if (number >= this.refs.childrens.length || number < 0) return;
            else {
                this.refs.active = number;
                this.refs.autoTimer && clearInterval(this.refs.autoTimer);
                this.refs.container.style.transition = `all ${this.delay}s ease-in-out`;
                this.refs.container.style.transform = `translate3d(-${number * 100}%, 0, 0)`;
                this.refs.skipTimer = setTimeout(() => {
                    this.refs.autoTimer = setInterval(() => cutCarousel(this.refs.active + 1), define.delay);
                    this.refs.skipTimer = undefined;
                }, this.delayUp);
            }
        };

        return {
            init,
            cutCarousel,
            triggerNext: () => cutCarousel(this.refs.active + 1),
            triggerBack: () => cutCarousel(this.refs.active - 1),
        };
    }
}
