import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: "/", name: "Home", component: () => import("../views/Home.vue") },
    { path: "/form", name: "Form", component: () => import("../views/Form.vue") },
    { path: "/input", name: "Input", component: () => import("../views/Input.vue") },
    { path: "/select", name: "Select", component: () => import("../views/Select.vue") },
    { path: "/checkbox", name: "Checkbox", component: () => import("../views/Checkbox.vue") },
    { path: "/scope-input", name: "ScopeInput", component: () => import("../views/ScopeInput.vue") },
    { path: "/steps-input", name: "StepsInput", component: () => import("../views/StepsInput.vue") },
    { path: "/button", name: "Button", component: () => import("../views/Button.vue") },
    { path: "/message", name: "Message", component: () => import("../views/Message.vue") },
    { path: "/tooltip", name: "Tooltip", component: () => import("../views/Tooltip.vue") },
    { path: "/scrollbar", name: "Scrollbar", component: () => import("../views/Scrollbar.vue") },
    { path: "/carousel", name: "Carousel", component: () => import("../views/Carousel.vue") },
    { path: "/seamless-scroll", name: "SeamlessScroll", component: () => import("../views/SeamlessScroll.vue") },
    { path: "/pagination", name: "Pagination", component: () => import("../views/Pagination.vue") },
    { path: "/textarea", name: "Textarea", component: () => import("../views/Textarea.vue") },
    { path: "/modal", name: "Modal", component: () => import("../views/Modal.vue") },
    { path: "/table", name: "Table", component: () => import("../views/Table.vue") },
    { path: "/radio", name: "Radio", component: () => import("../views/Radio.vue") },
];

export default createRouter({
    routes,
    history: createWebHistory(),
});
