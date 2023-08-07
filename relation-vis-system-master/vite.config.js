import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: "plugin/src/index.js",
      name: "PluginGraph",
      fileName: (format) => `PluginGraph.${format}.js`,
    },
    rollupOptions: {
      // 使外部模块变为 peerDependencies
      // external: ["vue"],
      output: {
        // 使 UMD 包兼容 AMD 和 CommonJS 规范
        exports: "named",
        // UMD 名称
        // globals: {
        //   vue: "Vue",
        // },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3005,
  },
});

// export default {
//   server: {
//     open: true,
//     host: "0.0.0.0",
//     // hmr: false,
//   },
//   build: {
//     target:'es2015',
//     rollupOptions: {
//       input: {
//         plugin: resolve(__dirname, "plugin/test.html"),
//       },
//     },
//   },
// };
