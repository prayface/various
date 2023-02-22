import SeamlessScroll from "./src/seamless-scroll.vue";
import { register } from "@various/utils";

SeamlessScroll.name = "UiSeamlessScroll";

export const UiSeamlessScroll = register.use(SeamlessScroll, "component");
export * from "./src/seamless-scroll";
export default UiSeamlessScroll;
