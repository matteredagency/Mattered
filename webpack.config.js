const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  mode: "production",
  context: __dirname,
  resolve: {
    extensions: ["*", ".js", ".ts"],
    modules: [__dirname, "src", "node_modules"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
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
};
