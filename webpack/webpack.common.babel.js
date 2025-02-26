import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import PKG from "../package.json";
import paths from "./paths.babel";

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const isStats = argv.stats;
  console.log(argv.mode);

  return {
    entry: {
      app: paths.src,
    },
    output: {
      filename: isProduction
        ? "js/[name].[contenthash].js"
        : "js/[name].bundle.js",
      chunkFilename: isProduction
        ? "js/[name].[contenthash].js"
        : "js/[name].bundle.js",
      path: paths.build,
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
      alias: {
        "@src": `${paths.src}`,
        "@app": `${paths.src}/app`,
        "@components": `${paths.src}/components`,
        "@assets": `${paths.src}/assets`,
        "@pages": `${paths.src}/pages`,
        "@styles": `${paths.src}/styles`,
        "@constants": `${paths.src}/constants`,
        "@utils": `${paths.src}/utils`,
      },
    },
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react-vendor",
            chunks: "all",
            priority: 20,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
        },
      },
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
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[id].[contenthash].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            to: paths.build,
            // Игнорируем index.html, чтобы не перезаписывать его плагином HtmlWebpackPlugin
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
      isStats ? new BundleAnalyzerPlugin() : undefined,
      // new CompressionPlugin(),
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
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
  };
};
