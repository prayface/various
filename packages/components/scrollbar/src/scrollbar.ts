import type { ExtractDefaultPropTypes } from "vue";

export const ScrollbarType = {
    noresize: { type: Boolean, default: false },
    height: { type: Number },
    always: { type: Boolean, default: true },
    width: { type: Number },
} as const;

export type ScrollbarProps = ExtractDefaultPropTypes<typeof ScrollbarType>;
