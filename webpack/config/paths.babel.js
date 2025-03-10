import path from "path";

export default {
  // Root folder
  root: path.resolve(__dirname, "../.."),

  // Source folder
  src: path.resolve(__dirname, "../../src"),

  // Production ready build
  build: path.resolve(__dirname, "../../build"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, "../../public"),
};
