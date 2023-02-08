import { PropType, ExtractPropTypes } from "vue";

export const messageType = {
    message: { type: String, required: true },
    type: { type: String as PropType<"success" | "warning" | "info" | "error">, default: "info" },
    icon: { type: String },
    delay: { type: Number, default: 3000 },
    offset: { type: Number, default: 20 },
} as const;

export type messageProps = ExtractPropTypes<typeof messageType>;
export type messageOption = {
    message: string;
    offset?: number;
    delay?: number;
    icon?: string;
    type?: string;
};
