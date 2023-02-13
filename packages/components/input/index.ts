import Input from "./src/input.vue";
import { register } from "../../utils";

Input.name = "UiInput";

export const UiInput = register.use(Input, "component");
export * from "./src/input";
export default UiInput;
