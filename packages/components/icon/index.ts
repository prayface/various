import Icon from "./default/index.vue";
import { register } from "@various/utils";

export const UiIcon = register.use(Icon, "component") as typeof Icon;
export * from "./default";
export default UiIcon;
