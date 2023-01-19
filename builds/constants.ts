module.exports = (function () {
    const { resolve } = require("path");

    //* 1. 根目录
    const DIRNAME = resolve(__dirname, "../");

    //* 2. 文件目录
    const OUTPUT = resolve(DIRNAME, "dist"); //? 输出目录
    const PACKAGES = resolve(DIRNAME, "packages"); //? 打包目录

    //* 3. 打包配置项
    const TARGET = "es2018"; //? 打包的ES版本
    const PACKAGING_TYPES = {
        esm: {
            ext: "mjs",
            format: "esm",
            module: "ESNext",
            bundle: { path: "various/es" },
            output: {
                name: "es",
                path: resolve(OUTPUT, "es"),
            },
        },
        cjs: {
            ext: "js",
            format: "cjs",
            module: "CommonJS",
            bundle: { path: "various/lib" },
            output: {
                name: "lib",
                path: resolve(OUTPUT, "lib"),
            },
        },
    };

    return { DIRNAME, OUTPUT, PACKAGES, TARGET, PACKAGING_TYPES, PACKAGING_TYPES_ENTRIES: Object.entries(PACKAGING_TYPES) };
})();
