import { ExtractPropTypes } from "vue";

export const UiIconType = { name: String } as const;
export type UiIconProps = ExtractPropTypes<typeof UiIconType>;
export const UiIconEmits = {
    click: (ev?: MouseEvent | Event) => ev,
};
