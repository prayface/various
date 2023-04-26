import Table from "./src/table.vue";
import { register } from "@various/utils";

export const UiTable = register.use(Table, "component") as typeof Table;
export * from "./src/table";
export default UiTable;