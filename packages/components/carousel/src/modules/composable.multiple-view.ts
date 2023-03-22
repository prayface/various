import { UiCarouselProps } from "../carousel";

export type UiCarouselConstructorRefs = {
    main?: HTMLDivElement;
    container?: HTMLDivElement;
    childrens?: HTMLElement[];
    skipTimer?: NodeJS.Timer;
    autoTimer?: NodeJS.Timer;
    controls: boolean;
    active: number;
};

export default class {
    refs: UiCarouselConstructorRefs;
    delay: number;
    delayUp: number;

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
        this.methods = this.#useMethods(define);
    }

    #useMethods(define: UiCarouselProps) {
        //? 初始化函数
        const init = () => {
            //* 获取模块容器失败则取消后续操作
            if (!this.refs.main || !this.refs.container) return;
            //* 初始化临时变量
            if (this.refs.main.clientWidth < this.refs.container.clientWidth) {
                this.refs.controls = true;
                this.refs.container.style.transition = `all ${this.delay}s ease-in-out`;
            }
        };

        //? 切换轮播图
        const cutCarousel = (number: number, data?: any) => {
            //* 检测是否满足运行条件
            if (!this.refs.main || !this.refs.container || this.refs.skipTimer) return;
            //* 判断是否左贴边
            if (number * this.refs.main.clientWidth <= 0) {
                this.refs.active = 0;
                this.refs.container.style.transform = `translate3d(0, 0, 0)`;
                this.refs.skipTimer = setTimeout(() => {
                    this.refs.skipTimer = undefined;
                }, this.delayUp);

                return;
            }

            //* 判断是否右贴边
            if ((number + 1) * this.refs.main.clientWidth >= this.refs.container.clientWidth) {
                this.refs.active = this.refs.container.clientWidth / this.refs.main.clientWidth - 1;
                this.refs.container.style.transform = `translate3d(${this.refs.active * -this.refs.main.clientWidth}px, 0, 0)`;
                this.refs.skipTimer = setTimeout(() => {
                    this.refs.skipTimer = undefined;
                }, this.delayUp);
                return;
            }

            //* 正常运行
            this.refs.active = number;
            this.refs.container.style.transform = `translate3d(${this.refs.active * -this.refs.main.clientWidth}px, 0, 0)`;
            this.refs.skipTimer = setTimeout(() => {
                this.refs.skipTimer = undefined;
            }, this.delayUp);
        };

        return {
            init,
            cutCarousel,
            triggerNext: () => cutCarousel(this.refs.active + 1),
            triggerBack: () => cutCarousel(this.refs.active - 1),
        };
    }
}
