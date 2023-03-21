import VuePlugin from "@vitejs/plugin-vue"; // vue编译插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import { defineConfig } from "vite";

export default () => {
    return defineConfig({
        server: {
            host: "0.0.0.0",
        },
        plugins: [
            VuePlugin(),
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, "../packages/icons")],
                symbolId: "icon-[name]",
            }),
        ],
        resolve: {
            alias: {
                "@various": resolve(__dirname, "../packages"),
            },
        },
    });
};
