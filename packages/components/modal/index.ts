import { register } from "@various/utils";

import Modal from "./default/index.vue";
import AsideModal from "./aside/index.vue";

export const UiModal = register.use(Modal, "component") as typeof Modal;
export const UiModalAside = register.use(AsideModal, "component") as typeof AsideModal;

export * from "./default";
export * from "./aside";

export default UiModal;
