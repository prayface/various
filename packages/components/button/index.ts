import Button from "./src/button.vue";
import { register } from "@various/utils";

export const UiButton = register.use(Button, "component") as typeof Button;
export * from "./default";
export default UiButton;
