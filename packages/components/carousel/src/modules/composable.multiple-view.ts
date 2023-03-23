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
                    const backNodeLeft = backNode.offsetLeft || 0;
                    //* 判断当前右侧偏移距离在该节点中
                    if (currentNode.offsetLeft < offset && currentNode.offsetLeft + currentNode.offsetWidth >= offset) {
                        //* 判断上一次右侧偏移举例是否在该节点中
                        if (currentNode.offsetLeft <= this.offset && currentNode.offsetLeft + currentNode.offsetWidth >= this.offset) {
                            //* 不做任何操作退出循环
                            break;
                        } else {
                            //* 存在下一个节点则下一个节点左贴边否则当前节点右贴边并退出循环
                            offset = currentNode.offsetLeft;
                            break;
                        }
                    }

                    if (currentNode.offsetLeft + currentNode.offsetWidth <= offset && backNodeLeft >= offset) {
                        //* 存在下一个节点则下一个节点左贴边否则当前节点右贴边并退出循环
                        offset = currentNode.offsetLeft;
                        break;
                    }
                }
            } else {
                //* 判断左侧滚动时是否存在左侧展示不完整内容
                for (let i = 0; i < this.refs.container.children.length; i++) {
                    const currentNode = this.refs.container.children[i] as HTMLElement;
                    const nextNode = this.refs.container.children[i + 1] as HTMLElement;
                    const nextNodeLeft = nextNode.offsetLeft || this.refs.container.clientWidth;
                    const offsetRight = offset + this.refs.main.clientWidth;
                    //* 判断当前右侧偏移距离在该节点中
                    if (currentNode.offsetLeft < offsetRight && currentNode.offsetLeft + currentNode.offsetWidth >= offsetRight) {
                        const offsetNextRight = this.offset + this.refs.main.clientWidth;
                        //* 判断上一次右侧偏移举例是否在该节点中
                        if (currentNode.offsetLeft <= offsetNextRight && currentNode.offsetLeft + currentNode.offsetWidth >= offsetNextRight) {
                            //* 不做任何操作退出循环
                            break;
                        } else {
                            //* 当前节点右贴边并退出循环
                            offset = currentNode.offsetLeft + currentNode.offsetWidth - this.refs.main.clientWidth;
                            break;
                        }
                    }

                    if (currentNode.offsetLeft + currentNode.offsetWidth <= offsetRight && nextNodeLeft >= offsetRight) {
                        //* 当前节点右贴边并退出循环
                        offset = currentNode.offsetLeft + currentNode.offsetWidth - this.refs.main.clientWidth;
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
