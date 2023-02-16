import Form from "./src/form.vue";
import FormItem from "./src/form-item/form-item.vue";
import { register } from "@various/utils";

Form.name = "UiForm";
FormItem.name = "UiFormItem";

export const UiForm = register.use(Form, "component");
export const UiFormItem = register.use(FormItem, "component");
export * from "./src/form";
export default UiForm;
