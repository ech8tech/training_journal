import { getEntry } from "./config/entry.babel";
import { getModule } from "./config/module.babel";
import { getOptimization } from "./config/optimization.babel";
import { getOutput } from "./config/output.babel";
import { getPlugins } from "./config/plugins.babel";
import { getResolve } from "./config/resolve.babel";

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const isStats = argv.stats;

  return {
    entry: getEntry(),
    output: getOutput(),
    resolve: getResolve(),
    optimization: getOptimization(),
    plugins: getPlugins(isStats),
    module: getModule(isProduction),
  };
};
