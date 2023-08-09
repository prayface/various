import { register } from "@various/utils";
import Pagination from "./default/index.vue";

export const UiPagination = register.use(Pagination, "component") as typeof Pagination;
export * from "./default/index";
export default UiPagination;
