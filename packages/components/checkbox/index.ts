import { register } from "@various/utils";
import Checkbox from "./src/checkbox.vue";
import CheckboxGroup from "./src/checkbox-group.vue";

export const UiCheckboxGroup = register.use(CheckboxGroup, "component");
export const UiCheckbox = register.use(Checkbox, "component");
export * from "./src/checkbox-group";
export * from "./src/checkbox";

export default UiCheckbox;
