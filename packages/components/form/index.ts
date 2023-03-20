import Form from "./src/form.vue";
import { register } from "@various/utils";

export const UiForm = register.use(Form, "component") as typeof Form;
export * from "./src/form";
export default UiForm;
