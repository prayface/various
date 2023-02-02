import { register } from "../../utils";
import Tooltip from "./src/tooltip.vue";

Tooltip.name = "UiTooltip";

export const UiTooltip = register.use(Tooltip, "component");
export * from "./src/tooltip";
export default UiTooltip;
