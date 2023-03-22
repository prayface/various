import { register } from "@various/utils";
import Tooltip from "./src/tooltip.vue";

export const UiTooltip = register.use(Tooltip, "component") as typeof Tooltip;
export * from "./src/tooltip";
export default UiTooltip;
