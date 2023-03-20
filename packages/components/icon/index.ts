import Icon from "./src/icon.vue";
import { register } from "@various/utils";

export const UiIcon = register.use(Icon, "component") as typeof Icon;
export * from "./src/icon";
export default UiIcon;
