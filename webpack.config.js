const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
// const DynamicCdnWebpackPlugin = require("dynamic-cdn-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  mode: NODE_ENV,
  entry: path.join(__dirname, "src", "index.jsx"),
  context: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|ico|jpe?g)$/,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "img-loader",
            options: {
              name: "[name]_[hash:5].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: /flexboxgrid/
      },
      {
        test: /\.css$/,
        exclude: /flexboxgrid/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: ["style-loader", "css-loader"]
          },
          {
            resourceQuery: /^\?raw-module$/,
            use: [
              { loader: "style-loader" },
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [autoprefixer]
                }
              }
            ]
          },
          {
            use: [
              { loader: "style-loader" },
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [autoprefixer]
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
    symlinks: false
  },
  plugins:
    NODE_ENV === "production"
      ? [htmlPlugin]
      : [htmlPlugin],
  devtool: NODE_ENV === "development" ? "source-map" : false,
  devServer: {
    historyApiFallback: true
  }
};
