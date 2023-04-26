import { register } from "@various/utils";
import Carousel from "./src/carousel.vue";
import CarouselMultipleView from "./src/carousel-multiple-view.vue";

export const UiCarousel = register.use(Carousel, "component") as typeof Carousel;
export const UiCarouselMultipleView = register.use(CarouselMultipleView, "component") as typeof CarouselMultipleView;
export * from "./src/carousel";
export default UiCarousel;
