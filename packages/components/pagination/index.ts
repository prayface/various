import { register } from "@various/utils";
import Pagination from "./src/pagination.vue";

export const UiPagination = register.use(Pagination, "component") as typeof Pagination;
export * from "./src/pagination";
export default UiPagination;
