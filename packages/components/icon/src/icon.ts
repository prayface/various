import type { ExtractDefaultPropTypes } from "vue";

export const IconType = { name: String } as const;
export type IconProps = ExtractDefaultPropTypes<typeof IconType>;
