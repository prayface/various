import Form from "./default/index.vue";
import FormItem from "./default-item/index.vue";
import { register } from "@various/utils";

export const UiForm = register.use(Form, "component") as typeof Form;
export const UiFormItem = register.use(FormItem, "component") as typeof FormItem;
export * from "./default";
export * from "./default-item";
export default UiForm;
