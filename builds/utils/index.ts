const { resolve } = require("path");
const { DIRNAME, PACKAGING_TYPES } = require("../constants");

const GetDependencies = (url: string) => {
    const { dependencies = {}, peerDependencies = {} } = require(url);

    return {
        dependencies: ["@vue", ...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    };
};

const GenerateExternal = async () => {
    const { dependencies } = GetDependencies(resolve(DIRNAME, "package.json"));

    return (id: string) => {
        return dependencies.some((pkg) => pkg === id || id.startsWith(`${pkg}/`));
    };
};

module.exports = {
    GetDependencies,
    GenerateExternal,
};
