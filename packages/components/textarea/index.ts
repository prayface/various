import Textarea from "./src/textarea.vue";
import { register } from "@various/utils";

export const UiTextarea = register.use(Textarea, "component") as typeof Textarea;
export * from "./src/textarea";
export default UiTextarea;
