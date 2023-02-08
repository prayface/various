// @ts-nocheck
// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UiIcon: typeof import("various-ui")["UiIcon"];
        UiButton: typeof import("various-ui")["UiButton"];
        UiTooltip: typeof import("various-ui")["UiTooltip"];
        UiScrollbar: typeof import("various-ui")["UiScrollbar"];
        VLoading: typeof import("various-ui")["VLoading"];
        $loading: typeof import("various-ui")["$loading"];
        $message: typeof import("various-ui")["$message"];
    }

    interface ComponentCustomProperties {}
}
