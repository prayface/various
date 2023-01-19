const { resolve } = require("path");
const { DIRNAME, PACKAGING_TYPES } = require("../constants");

const GetDependencies = (url: string) => {
    const { dependencies = {}, peerDependencies = {} } = require(url);

    return {
        dependencies: Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies),
    };
};

const GenerateExternal = async (options = { full: false }) => {
    const { dependencies, peerDependencies } = GetDependencies(resolve(DIRNAME, "package.json"));

    return (id: string) => {
        const packages = peerDependencies;
        if (!options.full) {
            packages.push("@vue", ...dependencies);
        }

        return packages.some((pkg) => pkg === id || id.startsWith(`${pkg}/`));
    };
};

module.exports = {
    GetDependencies,
    GenerateExternal,
};
