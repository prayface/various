//* 动画库
import { gsap } from "gsap";

interface AnimationOptions {
    beforeEnter?: () => void;
    beforeLeave?: () => void;
    afterEnter?: () => void;
    afterLeave?: () => void;
}

//* 动画（选择器）
export const selector = (is: boolean, dones?: AnimationOptions) => {
    return {
        //* 动画（离场前）
        "before-leave": () => dones?.beforeLeave?.(),
        //* 动画（入场前）
        "before-enter": (el: Element) => {
            //* 回调
            dones?.beforeEnter?.();
            //* 动画脚本
            is && gsap.set(el, { height: 0, opacity: 0 });
        },
        //* 动画（离场）
        "leave": (el: Element, done: () => void) => {
            //* 回调
            if (!is) {
                dones?.afterLeave?.();
                done?.();
            } else {
                //* 动画脚本
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        //* 结束
                        dones?.afterLeave?.();
                        done?.();
                    },
                });
            }
        },
        //* 动画（入场）
        "enter": (el: Element, done: () => void) => {
            //* 动画脚本
            if (!is) {
                //* 结束
                dones?.afterEnter?.();
                done?.();
            } else {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.2,
                    onComplete: () => {
                        //* 结束
                        dones?.afterEnter?.();
                        done?.();
                    },
                });
            }
        },
    };
};
