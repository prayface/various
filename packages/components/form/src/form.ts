import { ExtractPropTypes, PropType } from "vue";
import { UiTypes } from "@various/constants";

export const UiFormPropsOption = {
    size: { type: String as PropType<UiTypes.size>, default: "default" },
    data: {
        type: Object as PropType<{ [name: string]: any }>,
        default: () => {},
    },
    rules: {
        type: Object as PropType<{ [name: string]: UiTypes.verifyRule[] }>,
        default: () => {},
    },
} as const;

export type UiFormProps = ExtractPropTypes<typeof UiFormPropsOption>;
