module.exports = (function () {
    //* 第三方依赖引入
    const { resolve } = require("path");
    const { rollup } = require("rollup");
    const glob = require("fast-glob");
    const consola = require("consola");
    const VuePlugin = require("@vitejs/plugin-vue");
    const AliasPlugin = require("@rollup/plugin-alias");
    const VueJsxPlugin = require("@vitejs/plugin-vue-jsx");
    const EsbuildPlugin = require("rollup-plugin-esbuild");
    const CommonJSPlugin = require("@rollup/plugin-commonjs");
    const NodeResolvePlugin = require("@rollup/plugin-node-resolve");
    const VueDefineOptionsPlugin = require("unplugin-vue-define-options/rollup");

    //* 常量引入
    const { TARGET, PACKAGES, PACKAGING_TYPES_ENTRIES } = require("../constants.ts");
    //* 工具函数引入
    const { GenerateExternal } = require("../utils");

    //! JS, TS, Vue文件打包编译
    const modules = async (cb: () => void) => {
        const input = await glob(["**/*.{js,ts,vue}", "!icons/**/*", "!*.d.ts"], {
            cwd: PACKAGES,
            absolute: true,
            onlyFiles: true,
        });

        const rollupBundle = await rollup({
            input,
            treeshake: false,
            external: await GenerateExternal(),
            plugins: [
                AliasPlugin({
                    customResolver: NodeResolvePlugin({ extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".css", ".less", ".otf"] }),
                    entries: [{ find: "@various", replacement: PACKAGES }],
                }),
                NodeResolvePlugin(),
                VueDefineOptionsPlugin(),
                VuePlugin({ isProduction: false }),
                VueJsxPlugin(),
                CommonJSPlugin(),
                EsbuildPlugin.default({
                    target: TARGET,
                    sourceMap: true,
                    loaders: {
                        ".vue": "ts",
                    },
                }),
            ],
        });

        await Promise.all(
            PACKAGING_TYPES_ENTRIES.map(([module, config]: any) => {
                consola.success(`--- ${config.ext} 开始创建 ---`);
                return rollupBundle.write({
                    format: config.format,
                    dir: config.output.path,
                    exports: module === "cjs" ? "named" : undefined,
                    preserveModules: true,
                    preserveModulesRoot: resolve(PACKAGES, "index.ts"),
                    sourcemap: true,
                    entryFileNames: `[name].${config.ext}`,
                });
            })
        );

        cb && cb();
    };

    return modules;
})();
