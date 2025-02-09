import { merge } from "webpack-merge";

import paths from "./paths.babel";
import common from "./webpack.common.babel.js";

export default (env, argv) =>
  merge(common(env, argv), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: paths.build,
      hot: true,
      port: 9000,
      open: true,
      client: {
        overlay: false,
      },
    },
  });
