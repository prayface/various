import VuePlugin from "@vitejs/plugin-vue"; // vue编译插件
import { createStyleImportPlugin } from "vite-plugin-style-import";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { defineConfig } from "vite";
import { existsSync } from "fs";
import { resolve } from "path";

export default () => {
    return defineConfig({
        server: {
            host: "0.0.0.0",
        },
        plugins: [
            VuePlugin(),
            createStyleImportPlugin({
                libs: [
                    {
                        libraryName: "various-ui",
                        esModule: true,
                        resolveStyle: (name) => {
                            const result = `various-ui/styles/${name.split(/^ui-|v-/).slice(-1)[0]}.css`;
                            if (existsSync(resolve(__dirname, "node_modules", result))) return result;
                            else return "";
                        },
                    },
                ],
            }),
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, "node_modules/various-ui/icons")],
                symbolId: "icon-[name]",
            }),
        ],
    });
};
