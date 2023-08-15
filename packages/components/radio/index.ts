import Radio from "./default/index.vue";
import RadioGroup from "./default-group/index.vue";
import { register } from "@various/utils";

export const UiRadioGroup = register.use(RadioGroup, "component") as typeof RadioGroup;
export const UiRadio = register.use(Radio, "component") as typeof Radio;

export * from "./default";
export * from "./default-group";

export default UiRadio;
