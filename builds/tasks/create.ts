module.exports = (function () {
    //* 第三方依赖引入
    const fs = require("fs");
    const Gulp = require("gulp");
    const GulpClean = require("gulp-clean");

    //* 常量引入
    const { OUTPUT } = require("../constants.ts");

    //! 创建输出文件目录
    const create = (cb: () => void) => {
        //? 1. 根据是否存在输出目录来决定创建或清空目录内容
        if (fs.existsSync(OUTPUT)) {
            Gulp.src(`${OUTPUT}/*`, { allowEmpty: true }).pipe(GulpClean({ force: true }));
        } else {
            fs.mkdirSync(OUTPUT);
        }

        //? 2. 创建目录结构
        // fs.mkdirSync(`${OUTPUT}/assets`);
        // fs.mkdirSync(`${OUTPUT}/assets/fonts`);
        // fs.mkdirSync(`${OUTPUT}/assets/less`);
        // fs.mkdirSync(`${OUTPUT}/assets/css`);
        cb && cb();
    };

    return create;
})();
