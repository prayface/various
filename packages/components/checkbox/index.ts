import { register } from "@various/utils";
import Checkbox from "./src/checkbox.vue";
import CheckboxGroup from "./src/checkbox-group.vue";

export const UiCheckboxGroup = register.use(CheckboxGroup, "component") as typeof CheckboxGroup;
export const UiCheckbox = register.use(Checkbox, "component") as typeof Checkbox;
export * from "./src/checkbox-group";
export * from "./src/checkbox";

export default UiCheckbox;
