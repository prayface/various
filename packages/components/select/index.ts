import Select from "./default/index.vue";
import { register } from "@various/utils";

export const UiSelect = register.use(Select, "component") as typeof Select;

export * from "./default";

export default UiSelect;
