import paths from "./config/paths.babel";
import common from "./webpack.common.babel.js";

export default () => {
  const config = common();

  return {
    ...config,
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: paths.public,
      historyApiFallback: true,
      hot: true,
      port: process.env.PORT || 3000,
      client: {
        overlay: false,
      },
      host: "0.0.0.0",
      // proxy: [
      //   {
      //     context: ["/api"],
      //     target: `http://backend:${process.env.PORT}`,
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // ],
    },
  };
};
