import Table from "./default/index.vue";
import TableMerge from "./merge/index.vue";
import { register } from "@various/utils";

export const UiTable = register.use(Table, "component") as typeof Table;
export const UiTableMerge = register.use(TableMerge, "component") as typeof TableMerge;

export * from "./default/index";
export * from "./merge/index";

export default UiTable;
