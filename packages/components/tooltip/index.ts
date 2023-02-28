import { register } from "@various/utils";
import Tooltip from "./src/tooltip.vue";

Tooltip.name = "UiTooltip";

export const UiTooltip = register.use(Tooltip, "component") as typeof Tooltip;
export * from "./src/tooltip";
export default UiTooltip;
