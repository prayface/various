import Textarea from "./default/index.vue";
import { register } from "@various/utils";

export const UiTextarea = register.use(Textarea, "component") as typeof Textarea;
export * from "./default";
export default UiTextarea;
