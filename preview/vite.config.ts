import VuePlugin from "@vitejs/plugin-vue"; // vue编译插件
import { resolve } from "path";
import { defineConfig } from "vite";

export default () => {
    return defineConfig({
        plugins: [VuePlugin()],
        resolve: {
            alias: {
                "@various": resolve(__dirname, "../dist/lib"),
            },
        },
    });
};
