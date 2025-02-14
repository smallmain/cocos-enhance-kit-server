// @ts-check

/** @type {import("next").NextConfig} */
export default {
    webpack: webpackConfig => {
        webpackConfig.resolve.extensionAlias = {
            ".js": [".ts", ".js"],
            ".mjs": [".mts", ".mjs"],
            ".cjs": [".cts", ".cjs"],
            ".jsx": [".tsx", ".jsx"],
        };
        return webpackConfig;
    },
};
