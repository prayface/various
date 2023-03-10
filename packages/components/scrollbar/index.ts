import Scrollbar from "./src/scrollbar.vue";
import { register } from "@various/utils";

Scrollbar.name = "UiScrollbar";

export const UiScrollbar = register.use(Scrollbar, "component") as typeof Scrollbar;
export * from "./src/scrollbar";
export default UiScrollbar;
