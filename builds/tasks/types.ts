module.exports = (function () {
    //* 第三方依赖引入
    const { join, resolve, relative } = require("path");
    const { Project } = require("ts-morph");
    const fs = require("fs-extra");
    const glob = require("fast-glob");
    const consola = require("consola");
    const vueCompiler = require("vue/compiler-sfc");

    //* 常量引入
    const { OUTPUT, DIRNAME, PACKAGES } = require("../constants.ts");

    //* 计算所有的文件源
    const disposeSourceFiles = async (morph: any) => {
        //? 添加类型文件
        morph.addSourceFileAtPath(resolve(DIRNAME, "types/env.d.ts"));

        //? 获取Packages下的JS, TS, VUE文件, 排除icons目录和.d.ts文件
        const filePaths = await glob(["**/*.{js,ts,vue}", "!icons/**/*", "!*.d.ts"], {
            cwd: PACKAGES,
            absolute: true,
            onlyFiles: true,
        });

        //? 初始化项目文件源
        const sourceFiles: any[] = [];

        //? 解析Vue文件, 并将vue和js添加到sourceFiles中
        filePaths.map((file: any) => {
            if (file.endsWith(".vue")) {
                const SFC = vueCompiler.parse(fs.readFileSync(file, "utf-8"));
                if (SFC.descriptor.scriptSetup) {
                    return sourceFiles.push(
                        morph.createSourceFile(
                            `${relative(process.cwd(), file)}.${SFC.descriptor.scriptSetup.lang}`,
                            vueCompiler.compileScript(SFC.descriptor, { id: "xxx", reactivityTransform: true }).content
                        )
                    );
                }

                if (SFC.descriptor.script) {
                    return sourceFiles.push(
                        morph.createSourceFile(`${relative(process.cwd(), file)}.${SFC.descriptor.script.lang}`, SFC.descriptor.script?.content || "")
                    );
                }
            } else {
                return sourceFiles.push(morph.addSourceFileAtPath(file));
            }
        });

        return sourceFiles;
    };

    //! .d.ts类型文件生成
    const types = async (cb: () => void) => {
        const compilerOptions = {
            baseUrl: DIRNAME,
            skipLibCheck: true,
            noImplicitAny: false,
            preserveSymlinks: true,
            emitDeclarationOnly: true,
        };

        const morph = new Project({
            compilerOptions,
            tsConfigFilePath: resolve(DIRNAME, "tsconfig.vue.json"),
            skipAddingFilesFromTsConfig: true,
        });

        await disposeSourceFiles(morph);
        consola.success("Added source files");

        const diagnostics = morph.getPreEmitDiagnostics();
        if (diagnostics.length > 0) {
            diagnostics.forEach((v: string) => consola.success(v));
            consola.error(morph.formatDiagnosticsWithColorAndContext(diagnostics));
            const err = new Error("Failed to generate dts.");
            consola.error(err);
            throw err;
        }

        const result = await morph.emitToMemory({ emitOnlyDtsFiles: true });
        for (const file of result.getFiles()) {
            if (file.filePath.includes("/packages")) {
                fs.writeFileSync(join(OUTPUT, "es", file.filePath.split("/packages").slice(-1)[0]), file.text);
                fs.writeFileSync(join(OUTPUT, "lib", file.filePath.split("/packages").slice(-1)[0]), file.text);
            }
        }

        cb && cb();
    };

    return types;
})();
