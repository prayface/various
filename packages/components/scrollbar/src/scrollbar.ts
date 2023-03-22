import { ExtractPropTypes } from "vue";

export const UiScrollbarPropsOption = {
    noresize: { type: Boolean, default: false },
    height: { type: Number },
    always: { type: Boolean, default: true },
    width: { type: Number },
} as const;

export type UiScrollbarProps = ExtractPropTypes<typeof UiScrollbarPropsOption>;
