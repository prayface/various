import Form from "./src/form.vue";
import FormItem from "./src/form-item.vue";
import { register } from "@various/utils";

export const UiForm = register.use(Form, "component") as typeof Form;
export const UiFormItem = register.use(FormItem, "component") as typeof FormItem;
export * from "./src/form-item";
export * from "./src/form";
export default UiForm;
