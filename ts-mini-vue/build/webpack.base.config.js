const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
module.exports = {
    entry: path.resolve("src/index.ts"),
    output: {
        filename: "lie.js",
        path: path.resolve("dist"),
        library: "Lie",
        libraryTarget: "umd"
    },
    mode: "development",
    resolve: {
        extensions: [".ts", ".mjs", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: [
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            }
        ]
    },
    plugins: [new CheckerPlugin()]
};
