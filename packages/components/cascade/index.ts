import Cascade from "./index.vue";
import { register } from "@various/utils";

export const UiCascade = register.use(Cascade, "component") as typeof Cascade;
export * from "./src";
export default UiCascade;
