import FormItem from "./src/form-item.vue";
import { register } from "@various/utils";

export const UiFormItem = register.use(FormItem, "component") as typeof FormItem;
export * from "./src/form-item";
export default UiFormItem;
