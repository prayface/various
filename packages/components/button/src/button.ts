import type { ExtractPropTypes, PropType } from "vue";

export const ButtonType = {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    width: Number,
    size: { type: String as PropType<"large" | "small" | "middle" | "default">, default: "default" },
    type: { type: String as PropType<"button" | "submit" | "reset">, default: "submit" },
    mode: { type: String as PropType<"pierced" | "entity">, default: "entity" },
    icon: String,
} as const;

export type ButtonProps = ExtractPropTypes<typeof ButtonType>;
