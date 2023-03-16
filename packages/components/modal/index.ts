import { register } from "@various/utils";
import Modal from "./src/modal.vue";

export const UiModal = register.use(Modal, "component") as typeof Modal;
export * from "./src/modal";
export default UiModal;
