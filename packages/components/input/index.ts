import Input from "./default/index.vue";
import StepsInput from "./steps/index.vue";
import ScopeInput from "./scope/index.vue";
import { register } from "@various/utils";

export const UiInput = register.use(Input, "component") as typeof Input;
export const UiStepsInput = register.use(StepsInput, "component") as typeof StepsInput;
export const UiScopeInput = register.use(ScopeInput, "component") as typeof ScopeInput;

export * from "./default";
export * from "./steps";
export * from "./scope";

export default UiInput;
