const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const environment = process.env.NODE_ENV || "development";
const isDevelopment = environment === "development";
module.exports = {
  entry: {
    main: "./src/main/main.ts",
  },
  mode: environment,
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
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|glb|webp)$/,
        exclude: [/node_modules/, /dist/],
        use: ["file-loader"],
      },
      {
        test: /\.(ttf)$/,
        exclude: [/node_modules/, /dist/],
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/fonts",
          publicPath: "../public/fonts",
        },
      },
      {
        test: /\.glsl$/,
        exclude: [/node_modules/, /dist/],
        loader: "webpack-glsl-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
      meta: {
        viewport:
          "width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no",
        ["theme-color"]: "#E1E1E1",
      },
    }),
    new CopyPlugin({
      patterns: ["./public/assets"],
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    host: "localhost",
    open: { app: { name: "chrome" } },
    liveReload: true,
    watchFiles: ["src/*", "public/*"],
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
};
