import { UiCarouselProps } from "../carousel";

export type UiCarouselConstructorRefs = {
    main?: HTMLDivElement;
    container?: HTMLDivElement;
    childrens?: HTMLElement[];
    skipTimer?: NodeJS.Timer;
    autoTimer?: NodeJS.Timer;
    controls: boolean;
};

export default class {
    refs: UiCarouselConstructorRefs;
    delay: number;
    width: number;
    offset: number;
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
        this.width = 0;
        this.offset = 0;
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
                if (this.offset > 0) {
                    this.offset = (this.refs.container.clientWidth * this.offset) / this.width;
                    this.width = this.refs.container.clientWidth;
                    this.refs.container.style.transform = `translate3d(${-1 * this.offset}, 0, 0)`;
                } else {
                    this.width = this.refs.container.clientWidth;
                    this.refs.container.style.transform = "translate3d(0, 0, 0)";
                }
            } else {
                this.refs.container.style.transform = "translate3d(0, 0, 0)";
                this.refs.controls = false;
                this.offset = 0;
                this.width = this.refs.container.clientWidth;
            }
        };

        //? 切换轮播图
        const cutCarousel = (number: number, data?: any) => {
            //* 检测是否满足运行条件
            if (!this.refs.main || !this.refs.container || this.refs.skipTimer) return;

            //* 初始化轮播滚动位置
            let offset = this.offset + number * this.refs.main.clientWidth;

            //* 根据number为 1 or -1 进行滚动偏移计算
            if (number == 1) {
                //* 判断右侧滚动时是否存在右侧展示不完整内容
                for (let i = 1; i < this.refs.container.children.length - 1; i++) {
                    const currentNode = this.refs.container.children[i] as HTMLElement;
                    const backNode = this.refs.container.children[i - 1] as HTMLElement;
                    const nextNode = this.refs.container.children[i + 1] as HTMLElement;
                    //* 判断当前偏移的位置
                    if (offset < currentNode.offsetLeft + currentNode.offsetWidth && offset > currentNode.offsetLeft) {
                        //* 上一帧是否在范围内
                        const isRange = this.offset <= currentNode.offsetLeft + currentNode.offsetWidth && this.offset >= currentNode.offsetLeft;
                        if (isRange && currentNode.offsetWidth >= this.refs.main.clientWidth) {
                            break;
                        } else {
                            offset = currentNode.offsetLeft;
                            break;
                        }
                    } else if (offset <= currentNode.offsetLeft && offset >= backNode.offsetLeft + backNode.offsetWidth) {
                        offset = backNode.offsetLeft;
                        break;
                    } else if (offset <= nextNode.offsetLeft && offset >= currentNode.offsetLeft + currentNode.offsetWidth) {
                        offset = nextNode.offsetLeft;
                        break;
                    }
                }
            } else {
                //* 判断左侧滚动时是否存在左侧展示不完整内容
                for (let i = 1; i < this.refs.container.children.length - 1; i++) {
                    const currentNode = this.refs.container.children[i] as HTMLElement;
                    const backNode = this.refs.container.children[i - 1] as HTMLElement;
                    const nextNode = this.refs.container.children[i + 1] as HTMLElement;
                    if (offset < currentNode.offsetLeft + currentNode.offsetWidth && offset > currentNode.offsetLeft) {
                        //* 上一帧是否在范围内
                        const isRange = this.offset <= currentNode.offsetLeft + currentNode.offsetWidth && this.offset >= currentNode.offsetLeft;
                        //* 上一帧是否在currentNode节点与nextNode节点的间隙中
                        const isCurrentNextGap =
                            this.offset <= nextNode.offsetLeft && this.offset >= currentNode.offsetLeft + currentNode.offsetWidth;
                        //* 是否当前节点尺寸大于可是区域尺寸
                        const isViewRange = currentNode.offsetWidth >= this.refs.main.clientWidth;
                        if (isViewRange && isRange) {
                            break;
                        } else if (isViewRange && isCurrentNextGap) {
                            offset = currentNode.offsetLeft + currentNode.offsetWidth - this.refs.main.clientWidth;
                        } else {
                            offset = nextNode.offsetLeft;
                            break;
                        }
                    } else if (offset <= currentNode.offsetLeft && offset >= backNode.offsetLeft + backNode.offsetWidth) {
                        offset = currentNode.offsetLeft;
                        break;
                    } else if (offset <= nextNode.offsetLeft && offset >= currentNode.offsetLeft + currentNode.offsetWidth) {
                        offset = nextNode.offsetLeft;
                        break;
                    }
                }
            }

            //* 判断是否左侧贴边
            if (offset <= 0) offset = 0;
            else if (offset + this.refs.main.clientWidth >= this.refs.container.clientWidth) {
                //* 判断是否右侧贴边
                offset = (this.refs.container.clientWidth / this.refs.main.clientWidth - 1) * this.refs.main.clientWidth;
            }

            //* 执行脚本
            this.offset = offset;
            this.refs.container.style.transform = `translate3d(${this.offset * -1}px, 0, 0)`;
            this.refs.container.style.transition = `all ${this.delay}s ease-in-out`;
            this.refs.skipTimer = setTimeout(() => {
                this.refs.skipTimer = undefined;
            }, this.delayUp);
        };

        return {
            init,
            cutCarousel,
            triggerNext: () => cutCarousel(1),
            triggerBack: () => cutCarousel(-1),
        };
    }
}
