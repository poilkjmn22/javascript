const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

const babelConfig = require("./babel.config.json");

const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    SPA: "./src/SPA.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules' ),
        use: {
          loader: "babel-loader",
          options: Object.assign(
            {
              cacheDirectory: false,
            },
            babelConfig
          ),
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff2?|ttf|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  resolve: {
    mainFields: ["module", "main"],
    extensions: [".js", ".css", ".jsx", ".vue"],
    alias: {
      style: path.resolve(__dirname, "src/style/"),
      root: path.resolve(__dirname),
      "@": path.resolve(__dirname, "src/"),
      comp: path.resolve(__dirname, "src/components"),
    },
    //modules: ['node_modules', 'src']
  },
  output: {
    filename: "[name].bundle.js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "javascript Playground",
      filename: "index.html",
      template: "./src/index.template.html",
      chunks: ["SPA"],
    }),
    new EslintPlugin({
      outputReport: false,
      emitError: false,
      emitWarning: false,
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: -10,
        },
        default: {
          test: /[\\/]node_modules[\\/]/,
          name: "default",
          chunks: "all",
          priority: -20,
        },
      },
    },
  },
};
