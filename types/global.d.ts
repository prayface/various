// @ts-nocheck
// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UiIcon: typeof import("various-ui")["UiIcon"];
        UiButton: typeof import("various-ui")["UiButton"];
        UiTooltip: typeof import("various-ui")["UiTooltip"];
        UiTooltipFollow: typeof import("various-ui")["UiTooltipFollow"];
        UiTooltipFunction: typeof import("various-ui")["UiTooltipFunction"];
        UiForm: typeof import("various-ui")["UiForm"];
        UiInput: typeof import("various-ui")["UiInput"];
        UiStepsInput: typeof import("various-ui")["UiStepsInput"];
        UiSelect: typeof import("various-ui")["UiSelect"];
        UiCheckbox: typeof import("various-ui")["UiCheckbox"];
        UiCarousel: typeof import("various-ui")["UiCarousel"];
        UiCarouselMultipleView: typeof import("various-ui")["UiCarouselMultipleView"];
        UiSeamlessScroll: typeof import("various-ui")["UiSeamlessScroll"];
        UiPagination: typeof import("various-ui")["UiPagination"];
        UiTextarea: typeof import("various-ui")["UiTextarea"];
        UiModal: typeof import("various-ui")["UiModal"];
        UiModalAside: typeof import("various-ui")["UiModalAside"];
        UiModalSemiScreen: typeof import("various-ui")["UiModalSemiScreen"];
        UiTable: typeof import("various-ui")["UiTable"];
        UiRadio: typeof import("various-ui")["UiRadio"];
        vLoading: typeof import("various-ui")["vLoading"];
    }

    interface ComponentCustomProperties {
        $loading: typeof import("various-ui")["$loading"];
        $message: typeof import("various-ui")["$message"];
    }
}
