//* 公共函数
import { register } from "@various/utils";
//* 组件
import Table from "./index.vue";

export const UiTable2 = register.use(Table, "component") as typeof Table;
export * from "./src/component";
export default UiTable2;
