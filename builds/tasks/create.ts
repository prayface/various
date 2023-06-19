module.exports = (function () {
    //* 第三方依赖引入
    const fs = require("fs-extra");
    const Gulp = require("gulp");
    const consola = require("consola");
    const GulpClean = require("gulp-clean");

    //* 常量引入
    const { OUTPUT } = require("../constants.ts");

    //! 创建输出文件目录
    const create = (cb: () => void) => {
        //* 根据是否存在输出目录来决定创建或清空目录内容
        if (fs.pathExistsSync(OUTPUT)) {
            //* 日志打印
            consola.success("--- 输出目录清空 ---");

            //* 清空目录
            return Gulp.src(`${OUTPUT}/*`, { allowEmpty: true, read: false }).pipe(GulpClean({ force: true }));
        } else {
            //* 创建目录
            fs.ensureDirSync(OUTPUT);

            //* 日志打印
            consola.success("--- 输出目录创建成功 ---");

            //* 触发回调
            cb && cb();
        }
    };

    return create;
})();
