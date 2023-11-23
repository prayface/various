//* 动画库
import { gsap } from "gsap";

interface AnimationOptions {
    enterBefore?: () => void;
    leaveBefore?: () => void;
    enterAfter?: () => void;
    leaveAfter?: () => void;
}

//* 动画（选择器）
export const selector = (is: boolean, dones?: AnimationOptions) => {
    return {
        //* 动画（离场前）
        "before-leave": () => dones?.leaveBefore?.(),
        //* 动画（入场前）
        "before-enter": (el: Element) => {
            //* 回调
            dones?.enterBefore?.();
            //* 动画脚本
            is && gsap.set(el, { height: 0, opacity: 0 });
        },
        //* 动画（离场）
        "leave": (el: Element, done: () => void) => {
            //* 回调
            if (!is) {
                dones?.leaveAfter?.();
                done?.();
            } else {
                //* 动画脚本
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        //* 结束
                        dones?.leaveAfter?.();
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
                dones?.enterAfter?.();
                done?.();
            } else {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.2,
                    onComplete: () => {
                        //* 结束
                        dones?.enterAfter?.();
                        done?.();
                    },
                });
            }
        },
    };
};
