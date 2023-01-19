module.exports = (function () {
    //* 第三方依赖引入
    const { resolve } = require("path");
    const { copyFile } = require("fs/promises");
    //* 常量引入
    const { OUTPUT } = require("../constants.ts");

    //! 文件copy处理
    const copy = (cb: () => void) => {
        Promise.all([
            copyFile(resolve(DIRNAME, "package.json"), resolve(OUTPUT, "package.json")),
            copyFile(resolve(DIRNAME, "README.md"), resolve(OUTPUT, "README.md")),
            copyFile(resolve(DIRNAME, "global.d.ts"), resolve(OUTPUT, "global.d.ts")),
        ]);

        cb && cb();
    };

    return copy;
})();
