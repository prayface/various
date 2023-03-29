import { register } from "@various/utils";
import Select from "./src/select.vue";

export const UiSelect = register.use(Select, "component");
export * from "./src/select";
export default UiSelect;
