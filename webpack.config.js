const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const environment = process.env.NODE_ENV || "development";
const isDevelopment = environment === "development";

module.exports = {
  entry: "./src/main.ts",
  mode: environment,
  context: __dirname,
  resolve: {
    extensions: ["*", ".js", ".ts"],
    modules: [__dirname, "src", "node_modules"],
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, isDevelopment ? "/public" : "dist"),
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/, /dist/],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /dist/],
        loader: "ts-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
  devServer: {
    open: "chrome",
    host: "localhost",
    liveReload: true,
    watchFiles: ["src/*", "public/*"],
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
  },
};
