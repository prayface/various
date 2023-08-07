import { ExtractPropTypes, PropType } from "vue";

export const UiCarouselPropsOption = {
    arrow: { type: String as PropType<"always" | "hover" | "never">, default: "hover" }, // 切换箭头显示时期

    delay: { type: Number, default: 3000 }, // 自动切换的间隔
    transitionDelay: { type: Number, default: 500 }, // 过渡的间隔

    width: { type: [String, Number] as PropType<string | number>, default: "100%" }, // 轮播图宽度, 支持10px, 10vh, 10
    height: { type: [String, Number] as PropType<string | number>, default: "100%" }, // 轮播图高度, 支持10px, 10vh, 10

    drag: { type: Boolean, default: false }, // 是否开启拖拽功能
    autoplay: { type: Boolean, default: true }, // 是否开启自动切换
    pagination: { type: Boolean, default: true }, // 是否开启分页器
} as const;

export type UiCarouselProps = ExtractPropTypes<typeof UiCarouselPropsOption>;

export const UiCarouselEmits = {
    "drag": () => true,
    "change": (_number: number) => true,
    "drag-after": () => true,
    "change-after": (_number: number) => true,
};
