import { register } from "@various/utils";
import Pagination from "./src/pagination.vue";

Pagination.name = "UiPagination";

export const UiPagination = register.use(Pagination, "component");
export * from "./src/pagination";
export default UiPagination;
