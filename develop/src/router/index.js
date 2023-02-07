import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: "/", name: "Home", component: () => import("../views/Home.vue") },
    { path: "/button", name: "Button", component: () => import("../views/Button.vue") },
    { path: "/tooltip", name: "Tooltip", component: () => import("../views/Tooltip.vue") },
    { path: "/scrollbar", name: "Scrollbar", component: () => import("../views/Scrollbar.vue") },
];

export default createRouter({
    routes,
    history: createWebHistory(),
});