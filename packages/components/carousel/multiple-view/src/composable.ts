import _ from "lodash";
import { gsap } from "gsap";
import { SetupContext, useAttrs, computed, ref } from "vue";
import { UiCarouselMultipleViewProps, UiCarouselMultipleViewEmits } from "../index";

export const useComposable = (define: UiCarouselMultipleViewProps, emits: SetupContext<typeof UiCarouselMultipleViewEmits>["emit"]) => {
    //* 静态变量
    const variable = {
        delay: define.transitionDelay / 1000,
        width: 0,
        offset: 0,
        delayUp: define.transitionDelay * 1.1,
    };

    //* 响应式变量
    const refs = {
        main: ref<HTMLDivElement>(), //* 轮播图组件的主体
        controls: ref<Boolean>(false), //* 轮播图组件控制器显示状态
        autoTimer: ref<NodeJS.Timer>(), //* 轮播图组件自动播放定时器
        container: ref<HTMLDivElement>(), //* 轮播图组件列表的容器

        boundary: ref<string>("first"),  //* 是否到达边界  first | middle | last
    };

    //* 函数列表
    const methods = {
        //* 初始化函数
        init: () => {
            //* 获取模块容器失败则取消后续操作
            if (!refs.main.value || !refs.container.value) return;
            //* 初始化临时变量
            if (refs.main.value.clientWidth < refs.container.value.clientWidth) {
                refs.controls.value = true;
                if (variable.offset > 0) {
                    variable.offset = (refs.container.value.clientWidth * variable.offset) / variable.width;
                    variable.width = refs.container.value.clientWidth;
                    gsap.set(refs.container.value, { transform: `translate3d(${-1 * variable.offset}, 0, 0)` });
                } else {
                    variable.width = refs.container.value.clientWidth;
                    gsap.set(refs.container.value, { transform: "translate3d(0, 0, 0)" });
                }
            } else {
                refs.controls.value = false;
                variable.offset = 0;
                variable.width = refs.container.value.clientWidth;
                gsap.set(refs.container.value, { transform: "translate3d(0, 0, 0)" });
            }
        },

        //* 切换函数
        switchCarousel: (number: number, _data?: any) => {
            //* 检测是否满足运行条件
            if (!refs.main.value || !refs.container.value || refs.autoTimer.value) return;

            //* 初始化轮播滚动位置
            let offset = variable.offset + number * refs.main.value.clientWidth;

            //* 根据number为 1 or -1 进行滚动偏移计算
            if (number == 1) {
                //* 判断右侧滚动时是否存在右侧展示不完整内容
                for (let i = 1; i < refs.container.value.children.length - 1; i++) {
                    const currentNode = refs.container.value.children[i] as HTMLElement;
                    const backNode = refs.container.value.children[i - 1] as HTMLElement;
                    const backNodeRight = backNode ? backNode.offsetLeft + backNode.offsetWidth : 0;
                    //* 判断当前右侧偏移距离在该节点中
                    if (currentNode.offsetLeft < offset && currentNode.offsetLeft + currentNode.offsetWidth > offset) {
                        //* 判断上一次右侧偏移举例是否在该节点中
                        if (currentNode.offsetLeft <= variable.offset && currentNode.offsetLeft + currentNode.offsetWidth >= variable.offset) {
                            //* 不做任何操作退出循环
                            break;
                        } else {
                            //* 存在下一个节点则下一个节点左贴边否则当前节点右贴边并退出循环
                            offset = currentNode.offsetLeft;
                            break;
                        }
                    }

                    if (backNodeRight <= offset && currentNode.offsetLeft >= offset) {
                        //* 存在下一个节点则下一个节点左贴边否则当前节点右贴边并退出循环
                        offset = currentNode.offsetLeft;
                        break;
                    }
                }
            } else {
                //* 判断左侧滚动时是否存在左侧展示不完整内容
                for (let i = 0; i < refs.container.value.children.length; i++) {
                    const currentNode = refs.container.value.children[i] as HTMLElement;
                    const nextNode = refs.container.value.children[i + 1] as HTMLElement;
                    const nextNodeLeft = nextNode.offsetLeft || refs.container.value.clientWidth;
                    const offsetRight = offset + refs.main.value.clientWidth;
                    //* 判断当前右侧偏移距离在该节点中
                    if (currentNode.offsetLeft < offsetRight && currentNode.offsetLeft + currentNode.offsetWidth > offsetRight) {
                        const offsetNextRight = variable.offset + refs.main.value.clientWidth;
                        //* 判断上一次右侧偏移举例是否在该节点中
                        if (currentNode.offsetLeft <= offsetNextRight && currentNode.offsetLeft + currentNode.offsetWidth >= offsetNextRight) {
                            //* 不做任何操作退出循环
                            break;
                        } else {
                            //* 当前节点右贴边并退出循环
                            offset = currentNode.offsetLeft + currentNode.offsetWidth - refs.main.value.clientWidth;
                            break;
                        }
                    }

                    if (currentNode.offsetLeft + currentNode.offsetWidth <= offsetRight && nextNodeLeft >= offsetRight) {
                        //* 当前节点右贴边并退出循环
                        offset = currentNode.offsetLeft + currentNode.offsetWidth - refs.main.value.clientWidth;
                        break;
                    }
                }
            }

            //* 判断是否左侧贴边
            if (offset <= 0) {
                offset = 0;
                refs.boundary.value = "first";
            } else if (offset + refs.main.value.clientWidth >= refs.container.value.clientWidth) {
                //* 判断是否右侧贴边
                offset = (refs.container.value.clientWidth / refs.main.value.clientWidth - 1) * refs.main.value.clientWidth;
                refs.boundary.value = "last";

            } else {
                refs.boundary.value = "middle";
            }

            //* 执行脚本
            variable.offset = offset;
            gsap.to(refs.container.value, {
                duration: variable.delay,
                transform: `translate3d(${variable.offset * -1}px, 0, 0)`,
            });

            //* 计时器
            refs.autoTimer.value = setTimeout(() => {
                refs.autoTimer.value = undefined;
            }, variable.delayUp);
        },
    };

    //* 计算属性
    const computeds = {
        attrs: computed(() => useAttrs()),
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

        //* 主体类名
        className: computed(() => {
            //* 1. 初始化返回值
            const result: string[] = [];

            //* 2. hover显示按钮
            if (define.arrow == 'hover') result.push(`ui-hover-type`);

            return result.join(" ");
        }),
    };

    return { refs, methods, computeds };
};
