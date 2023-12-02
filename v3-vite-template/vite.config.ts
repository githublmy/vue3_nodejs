import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 自动导入图标
// import Icons from "unplugin-icons/vite";
// import IconsResolver from "unplugin-icons/resolver";
import { fileURLToPath, URL } from "node:url";
import { createHtmlPlugin } from "vite-plugin-html";
// svg插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 打包压缩插件
import VitePluginCompression from "vite-plugin-compression";
// mockjs
import { viteMockServe } from "vite-plugin-mock";

import VitePluginEslint from "vite-plugin-eslint";

// 打包分析
import visualizer from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // console.log(loadEnv(mode, process.cwd()));
  const env = loadEnv(mode, process.cwd());
  // 项目标题
  const TITLE = env["VITE_TITLE"];
  // 创建路径
  const getPath = (url: string) => {
    return fileURLToPath(new URL(url, import.meta.url));
  };

  return {
    base: "/",
    resolve: {
      // 路径别名
      alias: {
        "@": getPath("./src"),
      },
    },
    server: {
      port: 5173,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          // ws:true,//websockets
          changeOrigin: true, //允许跨域
          // 重写路由
          rewrite: (path) => path.replace(new RegExp(`^/api`), "^/api"),
        },
      },
    },
    plugins: [
      vue(),
      visualizer({
        // template: 'treemap', // sunburst | treemap | network | raw-data | list
        // open: true, //注意这里要设置为true，否则无效，自动打开
        // filename: "stats.html", //分析图生成的文件名
        filename: "visualizer/stats.html",
        gzipSize: true, // 收集 gzip 大小并将其显示
        brotliSize: true, // 收集 brotli 大小并将其显示
      }),
      VitePluginEslint(),
      //路径指向 .svg 文件夹
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹svg文件
        iconDirs: [getPath("src/assets/svg")],
        // 指定symbolId格式
        symbolId: "[dir]-[name]",
        // svgoOptions: {
        //   // 移除svg默认颜色
        //   plugins: [
        //     {
        //       name: "removeAttrs",
        //       params: { attrs: ["class", "data-name", "fill", "stroke"] },
        //     },
        //   ],
        // },
      }),
      //mockjs
      viteMockServe({
        mockPath: "mock", //解析根目录下的mock文件夹,设置模拟.ts 文件的存储文件夹
        watchFiles: false, //设置是否监视mockPath对应的文件夹内文件中的更改
        // 根据项目配置。可以配置在.env文件
        enable: true, //是否启用 mock 功能
      }),
      // gzip
      // VitePluginCompression({
      //   algorithm: "gzip", //压缩方式 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'默认gzip
      //   compressionOptions: { level: 9 }, //压缩等级
      //   ext: ".gz", //后缀默认 .gz
      //   threshold: 1024 * 300, //多大文件开始启动压缩 500kb
      //   deleteOriginFile: false, //是否删除原始文件
      // }),
      // 配置标题
      createHtmlPlugin({
        inject: {
          data: {
            title: TITLE,
          },
        },
      }),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            axios: [["default", "axios"]],
          },
        ],
        // dirs: ["./src/utils"],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          // IconsResolver({
          //   prefix: "Icon",
          // }),
        ],
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ["ep"],
          // }),
          ElementPlusResolver(),
        ],
      }),
      // Icons({
      //   autoInstall: true,
      // }),
    ],
    build: {
      // 打包生产环境，清除console和debugger
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // outDir: "dist", //打包的文件夹名称 默认 dist
      // assetsDir: "assets", //静态资源打包文件夹名称
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"], //打包目标兼容浏览器
      chunkSizeWarningLimit: 500, //打包文件多大警告  默认500kb
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL("index.html", import.meta.url)),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值  默认 "[name].js"
          entryFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名, 默认"assets/[name]-[hash][extname]"
          // assetFileNames: "[ext]/[name].[hash].[ext]",
          assetFileNames(assetsInfo) {
            const extNames = [".png", ".jpg", ".svg", ".webp", ".gif", ".jpeg"];
            if (assetsInfo.name.endsWith(".css")) {
              return "css/[name].[hash].[ext]";
            }
            if (extNames.some((ext) => assetsInfo.name.endsWith(ext))) {
              return "images/[name].[hash].[ext]";
            }
            return "assets/[ext]/[name].[hash].[ext]";
          },
          // 用于命名代码拆分时创建的共享块的输出命名 默认 "[name]-[hash].js"
          // chunkFileNames: "js/[name].[hash].js",
          // 拆分js到模块文件夹
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/")
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `js/${fileName}/name.[hash].js`;
          },
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          additionalData: "@import '@/assets/style/variables.scss';",
        },
      },
    },
  };
});
