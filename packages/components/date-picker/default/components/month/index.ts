import type { ModuleUpdateData } from "../../src/types";

export const UiPickerEmits = {
    change: (_date: ModuleUpdateData) => true,
    update: (_mode: string, _date: ModuleUpdateData) => true,
};
