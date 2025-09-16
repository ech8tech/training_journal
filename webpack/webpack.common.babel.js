import "dotenv/config";

import { getEntry } from "./config/entry.babel";
import { getModule } from "./config/module.babel";
import { getOptimization } from "./config/optimization.babel";
import { getOutput } from "./config/output.babel";
import { getPlugins } from "./config/plugins.babel";
import { getResolve } from "./config/resolve.babel";

// const NODE_ENV = process.env.NODE_ENV;
// console.log(NODE_ENV);
// Подхватываем .env, .env.production, .env.development и т.п.
// dotenvConf?.config({ path: `.${NODE_ENV}.env` });

export default () => {
  return {
    entry: getEntry(),
    output: getOutput(),
    resolve: getResolve(),
    optimization: getOptimization(),
    plugins: getPlugins(),
    module: getModule(),
  };
};
