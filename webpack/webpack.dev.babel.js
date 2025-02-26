import paths from "./config/paths.babel";
import common from "./webpack.common.babel.js";

export default (env, argv) => {
  const config = common(env, argv);

  return {
    ...config,
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: paths.build,
      historyApiFallback: true,
      hot: true,
      port: 9000,
      client: {
        overlay: false,
      },
    },
  };
};
