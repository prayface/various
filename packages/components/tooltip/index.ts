import { register } from "@various/utils";
import Tooltip from "./default/index.vue";
import TooltipFollow from "./follow/index.vue";
import TooltipFunction from "./function/index.vue";

export const UiTooltip = register.use(Tooltip, "component") as typeof Tooltip;
export const UiTooltipFollow = register.use(TooltipFollow, "component") as typeof TooltipFollow;
export const UiTooltipFunction = register.use(TooltipFunction, "component") as typeof TooltipFunction;

export * from "./follow/index";
export * from "./default/index";
export * from "./function/index";

export default UiTooltip;
