module.exports = (function () {
    //* 第三方依赖引入
    const fs = require("fs-extra");
    const Gulp = require("gulp");
    const GulpClean = require("gulp-clean");

    //* 常量引入
    const { OUTPUT } = require("../constants.ts");

    //! 创建输出文件目录
    const create = (cb: () => void) => {
        //? 根据是否存在输出目录来决定创建或清空目录内容
        if (fs.pathExistsSync(OUTPUT)) {
            return Gulp.src(`${OUTPUT}/*`, { allowEmpty: true, read: false }).pipe(GulpClean({ force: true }));
        } else {
            fs.ensureDirSync(OUTPUT);
            cb && cb();
        }
    };

    return create;
})();
