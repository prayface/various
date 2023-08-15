import { PropType, ExtractPropTypes } from "vue";

export const UiCarouselSeamlessPropsOption = {
    delay: { type: Number, default: 2000 }, //* 切换的间隔
    height: { type: [String, Number] as PropType<string | number>, required: true }, //* 轮播图高度, 支持10px, 10vh, 10
};

export type UiCarouselSeamlessProps = ExtractPropTypes<typeof UiCarouselSeamlessPropsOption>;
