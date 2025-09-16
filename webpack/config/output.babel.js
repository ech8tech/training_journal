import paths from "./paths.babel";

export function getOutput(isProduction) {
  return {
    filename: isProduction
      ? "js/[name].[contenthash].js"
      : "js/[name].bundle.js",
    chunkFilename: isProduction
      ? "js/[name].[contenthash].js"
      : "js/[name].bundle.js",
    path: paths.dist,
    publicPath: "/",
    clean: true,
  };
}
