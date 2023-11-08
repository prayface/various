// @ts-nocheck
// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UiIcon: typeof import("various-ui")["UiIcon"];
        UiTable: typeof import("various-ui")["UiTable"];
        UiTableMerge: typeof import("various-ui")["UiTableMerge"];
        UiButton: typeof import("various-ui")["UiButton"];
        UiPagination: typeof import("various-ui")["UiPagination"];

        UiTooltip: typeof import("various-ui")["UiTooltip"];
        UiTooltipFollow: typeof import("various-ui")["UiTooltipFollow"];
        UiTooltipFunction: typeof import("various-ui")["UiTooltipFunction"];

        UiForm: typeof import("various-ui")["UiForm"];
        UiInput: typeof import("various-ui")["UiInput"];
        UiScopeInput: typeof import("various-ui")["UiScopeInput"];
        UiStepsInput: typeof import("various-ui")["UiStepsInput"];
        UiRadio: typeof import("various-ui")["UiRadio"];
        UiSelect: typeof import("various-ui")["UiSelect"];
        UiCheckbox: typeof import("various-ui")["UiCheckbox"];
        UiTextarea: typeof import("various-ui")["UiTextarea"];

        UiCarousel: typeof import("various-ui")["UiCarousel"];
        UiCarouselSeamless: typeof import("various-ui")["UiCarouselSeamless"];
        UiCarouselMultipleView: typeof import("various-ui")["UiCarouselMultipleView"];

        UiModal: typeof import("various-ui")["UiModal"];
        UiModalAside: typeof import("various-ui")["UiModalAside"];
        UiModalSemiScreen: typeof import("various-ui")["UiModalSemiScreen"];

        vLoading: typeof import("various-ui")["vLoading"];
    }

    interface ComponentCustomProperties {
        $loading: typeof import("various-ui")["$loading"];
        $message: typeof import("various-ui")["$message"];
    }
}
