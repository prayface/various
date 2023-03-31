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
        UiSelect: typeof import("various-ui")["UiSelect"];
        UiCheckbox: typeof import("various-ui")["UiCheckbox"];
        UiCarousel: typeof import("various-ui")["UiCarousel"];
        UiSeamlessScroll: typeof import("various-ui")["UiSeamlessScroll"];
        UiPagination: typeof import("various-ui")["UiPagination"];
        UiTextarea: typeof import("various-ui")["UiTextarea"];
        UiModal: typeof import("various-ui")["UiModal"];
        vLoading: typeof import("various-ui")["vLoading"];
        $loading: typeof import("various-ui")["$loading"];
        $message: typeof import("various-ui")["$message"];
    }

    interface ComponentCustomProperties {}
}
