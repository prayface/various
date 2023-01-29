// @ts-nocheck
// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UiIcon: typeof import("various-ui")["UiIcon"];
        VLoading: typeof import("various-ui")["VLoading"];
        $loading: typeof import("various-ui")["$loading"];
    }

    interface ComponentCustomProperties {}
}
