import { register } from "@various/utils";
import Radio from "./src/radio.vue";
import RadioGroup from "./src/radio-group.vue";

export const UiRadioGroup = register.use(RadioGroup, "component") as typeof RadioGroup;
export const UiRadio = register.use(Radio, "component") as typeof Radio;
export * from "./src/radio-group";
export * from "./src/radio";

export default UiRadio;
