import { ExtractPropTypes, PropType } from "vue";

export const UiCarouselType = {
    loop: { type: Boolean, default: true }, //  是否循环显示
    arrow: { type: String as PropType<"always" | "hover" | "never">, default: "hover" }, // 切换箭头显示时期
    delay: { type: Number, default: 3000 }, // 自动切换的间隔
    height: { type: [String, Number] as PropType<string | number>, required: true }, // 轮播图高度, 支持10px, 10vh, 10
    autoplay: { type: Boolean, default: true }, // 是否开启自动切换
    direction: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" }, // 展示的方向
} as const;

export type UiCarouselProps = ExtractPropTypes<typeof UiCarouselType>;
export const UiCarouselEmits = {
    change: (ev: any) => ev,
};
