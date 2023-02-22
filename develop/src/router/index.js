import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: "/", name: "Home", component: () => import("../views/Home.vue") },
    { path: "/form", name: "Form", component: () => import("../views/Form.vue") },
    { path: "/input", name: "Input", component: () => import("../views/Input.vue") },
    { path: "/button", name: "Button", component: () => import("../views/Button.vue") },
    { path: "/message", name: "Message", component: () => import("../views/Message.vue") },
    { path: "/tooltip", name: "Tooltip", component: () => import("../views/Tooltip.vue") },
    { path: "/scrollbar", name: "Scrollbar", component: () => import("../views/Scrollbar.vue") },
    { path: "/carousel", name: "Carousel", component: () => import("../views/Carousel.vue") },
];

export default createRouter({
    routes,
    history: createWebHistory(),
});
