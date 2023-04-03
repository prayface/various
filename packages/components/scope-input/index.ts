import { register } from "@various/utils";
import ScopeInput from "./src/scope-input.vue";

export const UiScopeInput = register.use(ScopeInput, "component");
export * from "./src/scope-input";
export default UiScopeInput;
