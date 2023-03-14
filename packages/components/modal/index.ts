import Modal from "./src/modal.vue";
import { register } from "@various/utils";

export const UiModal = register.use(Modal, "component");
export * from "./src/modal";
export default UiModal;
