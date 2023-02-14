import Icon from "./src/icon.vue";
import { register } from "@various/utils";

Icon.name = "UiIcon";

export const UiIcon = register.use(Icon, "component");
export * from "./src/icon";
export default UiIcon;
