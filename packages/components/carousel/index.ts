import Carousel from "./src/carousel.vue";
import { register } from "@various/utils";

export const UiCarousel = register.use(Carousel, "component") as typeof Carousel;
export * from "./src/carousel";
export default UiCarousel;
