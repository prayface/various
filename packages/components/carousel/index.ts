import Carousel from "./src/carousel.vue";
import { register } from "@various/utils";

Carousel.name = "UiCarousel";

export const UiCarousel = register.use(Carousel, "component");
export * from "./src/carousel";
export default UiCarousel;
