import { register } from "@various/utils";
import Checkbox from "./default/index.vue";
import CheckboxGroup from "./default-group/index.vue";

export const UiCheckboxGroup = register.use(CheckboxGroup, "component") as typeof CheckboxGroup;
export const UiCheckbox = register.use(Checkbox, "component") as typeof Checkbox;

export * from "./default";
export * from "./default-group";

export default UiCheckbox;
