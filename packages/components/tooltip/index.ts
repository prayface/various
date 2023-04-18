import { register } from "@various/utils";
import Tooltip from "./src/tooltip.vue";
import TooltipFollow from "./src/tooltip-follow.vue";

export const UiTooltip = register.use(Tooltip, "component") as typeof Tooltip;
export const UiTooltipFollow = register.use(TooltipFollow, "component") as typeof TooltipFollow;
export * from "./src/tooltip";
export default UiTooltip;
