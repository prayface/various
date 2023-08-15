import { register } from "@various/utils";
import Carousel from "./default/index.vue";
import CarouselSeamless from "./seamless/index.vue";
import CarouselMultipleView from "./multiple-view/index.vue";

export const UiCarousel = register.use(Carousel, "component") as typeof Carousel;
export const UiCarouselSeamless = register.use(CarouselSeamless, "component") as typeof CarouselSeamless;
export const UiCarouselMultipleView = register.use(CarouselMultipleView, "component") as typeof CarouselMultipleView;

export * from "./default";
export * from "./seamless";
export * from "./multiple-view";

export default UiCarousel;
