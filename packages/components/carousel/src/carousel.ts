import { ExtractPropTypes, PropType } from "vue";

export const UiCarouselPropsOption = {
    mode: { type: String as PropType<"default" | "multiple-view">, default: "default" }, // 轮播图的模式
    arrow: { type: String as PropType<"always" | "hover" | "never">, default: "hover" }, // 切换箭头显示时期

    delay: { type: Number, default: 3000 }, // 自动切换的间隔
    transitionDelay: { type: Number, default: 500 }, // 过渡的间隔

    width: { type: [String, Number] as PropType<string | number>, default: "100%" }, // 轮播图宽度, 支持10px, 10vh, 10
    height: { type: [String, Number] as PropType<string | number>, default: "100%" }, // 轮播图高度, 支持10px, 10vh, 10
    direction: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" }, // 展示的方向

    loop: { type: Boolean, default: true }, //  是否开启无限循环
    autoplay: { type: Boolean, default: true }, // 是否开启自动切换
    pagination: { type: Boolean, default: true }, // 是否开启分页器
} as const;

export type UiCarouselProps = ExtractPropTypes<typeof UiCarouselPropsOption>;
export const UiCarouselEmits = {
    change: (ev?: any) => ev,
};
