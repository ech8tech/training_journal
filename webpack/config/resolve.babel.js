import paths from "./paths.babel";

export function getResolve() {
  return {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    alias: {
      "@src": `${paths.src}`,
      "@app": `${paths.src}/app`,
      "@components": `${paths.src}/components`,
      "@assets": `${paths.src}/assets`,
      "@pages": `${paths.src}/pages`,
      "@styles": `${paths.src}/styles`,
      "@constants": `${paths.src}/constants`,
      "@utils": `${paths.src}/utils`,
      "@configs": `${paths.src}/configs`,
    },
  };
}
