import SeamlessScroll from "./src/seamless-scroll.vue";
import { register } from "@various/utils";

export const UiSeamlessScroll = register.use(SeamlessScroll, "component") as typeof SeamlessScroll;
export * from "./src/seamless-scroll";
export default UiSeamlessScroll;
