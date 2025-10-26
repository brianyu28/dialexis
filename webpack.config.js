const path = require("path");

const mode = process.env.NODE_ENV || "development";
const isDevelopment = mode === "development";

module.exports = [
  // Shared export
  {
    mode,
    devtool: isDevelopment ? "eval-source-map" : false,
    entry: {
      dialexis: {
        import: "./src/index.ts",
        filename: "dialexis.js",
        library: {
          name: "Dialexis",
          type: "umd",
        },
      },
    },
    output: {
      // filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      globalObject: "this",
    },
    watchOptions: {
      ignored: ["**/node_modules", path.resolve(__dirname, "dist")],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: [/node_modules/, /dist/],
        },
      ],
    },
  },
];
