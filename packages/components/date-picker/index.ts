import DatePicker from "./default/index.vue";

import { register } from "@various/utils";

export const UiDatePicker = register.use(DatePicker, "component") as typeof DatePicker;

export * from "./default";

export default UiDatePicker;
