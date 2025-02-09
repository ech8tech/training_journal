import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// import WorkBox from "workbox-webpack-plugin";
import PKG from "../package.json";
import paths from "./paths.babel";

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      app: paths.src,
    },
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].bundle.js",
      path: paths.build,
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    optimization: {
      usedExports: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: PKG.description,
        // favicon: `${paths.public}/assets/icons/favicon.png`,
        template: `${paths.public}/index.html`, // template file
        filename: "index.html", // output file
        meta: {
          viewport: "width=device-width, initial-scale=1.0",
          charset: "UTF-8",
        },
      }),
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isProduction
                    ? "[hash:base64:8]"
                    : "[name]__[local]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
