const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      "@icons": path.resolve(__dirname, "src/assets/icons/"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@context": path.resolve(__dirname, "src/context/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs|js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Countdown timer",
      template: "./public/index.html",
      inject: true,
    }),
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    port: 3000,
    compress: true,
    historyApiFallback: true,
    open: true,
    watchFiles: {
      paths: ["src/**"],
    },
  },
  stats: { errorDetails: true },
};
