module.exports = (function () {
    //* 第三方依赖引入
    const { resolve } = require("path");
    const Gulp = require("gulp");
    const consola = require("consola");
    const DartLess = require("less");
    const GulpLess = require("gulp-less");
    const CleanCss = require("gulp-clean-css");
    const GulpRename = require("gulp-rename");
    const Autoprefixer = require("gulp-autoprefixer");

    //* 常量引入
    const { OUTPUT, PACKAGES } = require("../constants.ts");

    //! Less编译, Css兼容和压缩处理
    const styles = (cb: () => void) => {
        Gulp.src(resolve(PACKAGES, "**/style/*.less"))
            .pipe(GulpLess(DartLess))
            .pipe(Autoprefixer({ cascade: false }))
            .pipe(
                CleanCss({}, (details: any) => {
                    consola.success(`${details.name}: ${details.stats.originalSize / 1000}KB -> ${details.stats.minifiedSize / 1000}KB`);
                })
            )
            .pipe(
                GulpRename((file: any) => {
                    return {
                        dirname: "",
                        extname: file.extname,
                        basename: file.basename,
                    };
                })
            )
            .pipe(Gulp.dest(resolve(OUTPUT, "style")));

        cb && cb();
    };

    return styles;
})();
