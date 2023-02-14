import Button from "./src/button.vue";
import { register } from "@various/utils";

Button.name = "UiButton";

export const UiButton = register.use(Button, "component");
export * from "./src/button";
export default UiButton;
