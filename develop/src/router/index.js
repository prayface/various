import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: "/", name: "Home", component: () => import("../views/Home.vue") },
    { path: "/button", name: "Button", component: () => import("../views/Button.vue") },
];

export default createRouter({
    routes,
    history: createWebHistory(),
});
