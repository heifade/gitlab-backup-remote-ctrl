import { resolve } from "path";

const config = {
  entry: {
    index: resolve(__dirname, "./src/index")
  },
  outputPath: resolve(__dirname, "../dist/public"),
  define: {
    "process.env": {
      ENV: process.env.ENV
    }
  },
  hash: true,
  theme: {
    "@primary-color": "#1DA57A"
  },
  proxy: {
    "/api": {
      target: "http://***/api",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    },
    "/ws": {
      target: "ws://localhost:81/ws",
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/ws": "" }
    }
  },
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]
  ],
  alias: {
    components: resolve(__dirname, "./src/components/")
  }
};

export default config;
