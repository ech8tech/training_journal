import { merge } from "webpack-merge";

import common from "./webpack.common.babel.js";

export default (env, argv) =>
  merge(common(env, argv), {
    mode: "production",
  });
