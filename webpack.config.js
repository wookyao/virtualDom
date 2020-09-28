const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: "./",
    open: true,
  },
};
