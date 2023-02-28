import Form from "./src/form.vue";
import FormItem from "./src/form-item/form-item.vue";
import { register } from "@various/utils";

Form.name = "UiForm";
FormItem.name = "UiFormItem";

export const UiForm = register.use(Form, "component") as InstanceType<typeof Form>;
export const UiFormItem = register.use(FormItem, "component") as InstanceType<typeof FormItem>;
export * from "./src/form";
export default UiForm;
