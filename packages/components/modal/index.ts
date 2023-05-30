import { register } from "@various/utils";

import Modal from "./default/index.vue";
import AsideModal from "./aside/index.vue";
import SemiScreenModal from "./semi-screen/index.vue";

export const UiModal = register.use(Modal, "component") as typeof Modal;
export const UiModalAside = register.use(AsideModal, "component") as typeof AsideModal;
export const UiModalSemiScreen = register.use(SemiScreenModal, "component") as typeof SemiScreenModal;

export * from "./semi-screen";
export * from "./default";
export * from "./aside";

export default UiModal;
