import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import PKG from "../../package.json";
import paths from "./paths.babel";

export function getPlugins() {
  return [
    new HtmlWebpackPlugin({
      title: PKG.description,
      // favicon: `${paths.public}/assets/icons/favicon.png`,
      template: `${paths.public}/index.html`, // template file
      filename: "index.html", // output file
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
          to: paths.dist,
          // Игнорируем index.html, чтобы не перезаписывать его плагином HtmlWebpackPlugin
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
    }),
    // isStats ? new BundleAnalyzerPlugin() : undefined,
  ];
}
