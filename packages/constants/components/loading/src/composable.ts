import { gsap } from "gsap";
import { computed, ref } from "vue";
import { UiLoadingProps } from "./loading";

import type UiIcon from "@various/components/icon";

export const useComposable = (define: UiLoadingProps) => {
    const refs = {
        iconNode: ref<InstanceType<typeof UiIcon>>(),
    };

    const computeds = {
        style: computed(() => {
            if (define.zIndex) return { "z-index": define.zIndex };
            else return {};
        }),

        className: computed(() => {
            if (define.mode == "fixed") return "ui-fixed-loading";
            else return "";
        }),
    };

    const methods = {
        //* 入场前动画
        entrancePreAnimation: (el: Element) => {
            gsap.set(el, { opacity: 0 });
        },

        //* 离场动画
        departureAnimation: (el: Element) => {
            gsap.to(el, {
                duration: 0.1,
                opacity: 0,
                onComplete: () => {
                    if (refs.iconNode.value?.$el) {
                        gsap.killTweensOf(refs.iconNode.value.$el);
                    }
                },
            });
        },

        //* 入场动画
        entranceAnimation: (el: Element) => {
            gsap.to(el, { duration: 0.05, opacity: 1 });
            if (refs.iconNode.value?.$el) {
                gsap.to(refs.iconNode.value.$el, { duration: 1, repeat: -1, ease: "none", rotation: 360 });
            }
        },
    };

    return { computeds, methods, refs };
};
