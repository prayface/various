import Input from "./src/default/index.vue";
import StepsInput from "./src/steps/index.vue";
import { register } from "@various/utils";

export const UiInput = register.use(Input, "component") as typeof Input;
export const UiStepsInput = register.use(StepsInput, "component") as typeof StepsInput;

export * from "./src/default/index";
export * from "./src/steps/index";

export default UiInput;
