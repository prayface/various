import type { ExtractPropTypes } from "vue";

export const IconType = { name: String } as const;
export type IconProps = ExtractPropTypes<typeof IconType>;
