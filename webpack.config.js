const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/ui.js",
  output: {
    filename: "ui.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/battleship/",
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/battleship/",
    },
    devMiddleware: {
      publicPath: "/battleship/",
    },
    open: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
