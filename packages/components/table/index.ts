import Table from "./default/index.vue";
import { register } from "@various/utils";

export const UiTable = register.use(Table, "component") as typeof Table;
export * from "./default/index";
export default UiTable;
