import { PropType } from "vue";

export const TooltipType = {
    direction: { type: String as PropType<"top" | "left" | "right" | "bottom">, default: "right" },
    disabled: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
    trigger: { type: String as PropType<"click" | "focue" | "hover">, default: "hover" },
    content: { type: String }, //? 窗口内容, 可被slot#content替换
    effect: { type: String }, //? Tooltip主题
    width: { type: Number, default: 200 }, //? 最大宽度
    align: { type: String as PropType<"top" | "center" | "bottom">, default: "top" },
    mode: { type: String as PropType<"fixed" | "follow">, default: "fixed" },
} as const;
