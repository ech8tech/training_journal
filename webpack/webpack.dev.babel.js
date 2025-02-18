import paths from "./paths.babel";
import common from "./webpack.common.babel.js";

export default (env, argv) => {
  const config = common(env, argv);

  return {
    ...config,
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: paths.public,
      historyApiFallback: true,
      hot: true,
      port: 9000,
      open: true,
      client: {
        overlay: false,
      },
    },
  };
};
