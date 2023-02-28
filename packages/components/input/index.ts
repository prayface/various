import Input from "./src/input.vue";
import { register } from "@various/utils";

Input.name = "UiInput";

export const UiInput = register.use(Input, "component") as InstanceType<typeof Input>;
export * from "./src/input";
export default UiInput;
