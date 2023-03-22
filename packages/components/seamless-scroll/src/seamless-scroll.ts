import { PropType, ExtractPropTypes } from "vue";

export const UiSeamlessScrollPropsOption = {
    delay: { type: Number, default: 2 }, // 自动切换的间隔
    height: { type: [String, Number] as PropType<string | number>, required: true }, // 轮播图高度, 支持10px, 10vh, 10
    direction: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" }, // 展示的方向
};

export type UiSeamlessScrollProps = ExtractPropTypes<typeof UiSeamlessScrollPropsOption>;
