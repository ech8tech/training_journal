import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function getModule() {
  const isProduction = process.env.NODE_ENV === "production";

  console.log(isProduction);

  console.log(
    "####################",
    process.env.NODE_ENV,
    process.env.PORT,
    process.env.API_URL,
  );

  return {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css)$/,
        exclude: /\.module\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // ← без modules
          "sass-loader",
        ],
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
  };
}
