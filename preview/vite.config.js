import VuePlugin from "@vitejs/plugin-vue"; // vue编译插件
import AutoImportPlugin from "vite-plugin-imp"; // 测试插件
import { defineConfig } from "vite";

export default () => {
    return defineConfig({
        plugins: [
            VuePlugin(),
            AutoImportPlugin({
                libList: [
                    {
                        libName: "various-ui",
                        style(name) {
                            if (name.startsWith("ui")) {
                                return `various-ui/styles/${name.slice(3)}.css`;
                            }
                        },
                    },
                ],
            }),
        ],
    });
};
