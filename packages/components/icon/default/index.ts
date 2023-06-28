import { ExtractPropTypes } from "vue";

export const UiIconPropsOption = { name: String } as const;
export type UiIconProps = ExtractPropTypes<typeof UiIconPropsOption>;
export const UiIconEmits = {
    click: (_ev?: MouseEvent | Event) => true,
};
