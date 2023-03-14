// @ts-nocheck
// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UiIcon: typeof import("various-ui")["UiIcon"];
        UiButton: typeof import("various-ui")["UiButton"];
        UiTooltip: typeof import("various-ui")["UiTooltip"];
        UiScrollbar: typeof import("various-ui")["UiScrollbar"];
        UiForm: typeof import("various-ui")["UiForm"];
        UiInput: typeof import("various-ui")["UiInput"];
        UiCarousel: typeof import("various-ui")["UiCarousel"];
        UiSeamlessScroll: typeof import("various-ui")["UiSeamlessScroll"];
        UiPagination: typeof import("various-ui")["UiPagination"];
        UiTextarea: typeof import("various-ui")["UiTextarea"];
        UiModal: typeof import("various-ui")["UiModal"];
        VLoading: typeof import("various-ui")["VLoading"];
        $loading: typeof import("various-ui")["$loading"];
        $message: typeof import("various-ui")["$message"];
    }

    interface ComponentCustomProperties {}
}
