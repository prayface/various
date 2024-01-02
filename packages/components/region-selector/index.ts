import RegionSelector from "./index.vue";

import { register } from "@various/utils";

export const UiRegionSelector = register.use(RegionSelector, "component") as typeof RegionSelector;

export * from "./src";

export default UiRegionSelector;
