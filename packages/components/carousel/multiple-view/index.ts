import { ExtractPropTypes, PropType } from "vue";

export const UiCarouselMultipleViewPropsOption = {
    delay: { type: Number, default: 500 }, //* 过渡的间隔
    arrow: { type: String as PropType<"always" | "hover" | "never">, default: "hover" }, //* 切换箭头显示时期
    width: { type: [String, Number] as PropType<string | number>, default: "100%" }, //* 轮播图宽度, 支持10px, 10vh, 10
    height: { type: [String, Number] as PropType<string | number>, default: "100%" }, //* 轮播图高度, 支持10px, 10vh, 10
} as const;

export type UiCarouselMultipleViewProps = ExtractPropTypes<typeof UiCarouselMultipleViewPropsOption>;

export const UiCarouselMultipleViewEmits = {
    change: (_number: number) => true,
};
