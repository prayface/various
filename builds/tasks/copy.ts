module.exports = (function () {
    //* 第三方依赖引入
    const fs = require("fs-extra");
    const { resolve } = require("path");

    //* 常量引入
    const { OUTPUT, DIRNAME, PACKAGES } = require("../constants.ts");

    //! 文件copy处理
    const copy = async (cb: () => void) => {
        //* 文件复制
        await Promise.all([
            fs.copy(resolve(DIRNAME, "package.json"), resolve(OUTPUT, "package.json")),
            fs.copy(resolve(DIRNAME, "README.md"), resolve(OUTPUT, "README.md")),
            fs.copy(resolve(DIRNAME, "types/global.d.ts"), resolve(OUTPUT, "global.d.ts")),
            fs.copy(resolve(PACKAGES, "icons"), resolve(OUTPUT, "icons")),
        ]);

        cb && cb();
    };

    return copy;
})();
