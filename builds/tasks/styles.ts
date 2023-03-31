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

    //* 待打包的less目录列表
    const resource = [
        resolve(PACKAGES, "styles/*.less"),
        resolve(PACKAGES, "methods/**/style/*.less"),
        resolve(PACKAGES, "directives/**/style/*.less"),
        resolve(PACKAGES, "components/**/style/*.less"),
        "!**/*.size.less",
        "!**/*.type.less",
        "!**/*.status.less",
    ];

    //! Less编译, Css兼容和压缩处理
    const styles = () => {
        return Gulp.src(resource, { allowEmpty: true })
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
            .pipe(Gulp.dest(resolve(OUTPUT, "styles")));
    };

    return styles;
})();
