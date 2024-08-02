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
// import VitePluginCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
// 打包分析
import { visualizer } from "rollup-plugin-visualizer";
// import fs from "fs";
// import { dayjs } from "element-plus";
// const version = {
//   latestTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
// };
// fs.writeFile("./src/utils/buildTime.json", JSON.stringify(version), (err) => {
//   console.log("打包时间更新成功");
// });
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
    base: "./",
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
        "/files/upload": {
          target: "http://localhost:3000",
          // ws:true,//websockets
          changeOrigin: true, //允许跨域
          // 重写路由
          // rewrite: (path) => path.replace(new RegExp(`/files`), '/files')
        },
      },
    },
    plugins: [
      vue(),
      removeConsole({
        external: ["App.vue", "src/views/home/index.vue"],
        externalValue: [
          "清除？App。vue",
          " ",
          "`%c 前端打包时间 %c ${time.latestTime} `",
        ],
        //       custom:[`console.log(`%c '前端打包时间' %c`,
        //   "background:#3eaf7c ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
        //   "background:#007AFF ;padding: 1px; color: #fff; font-weight: bold;"
        // )`]
      }),
      visualizer({
        // template: 'treemap', // sunburst | treemap | network | raw-data | list
        // open: true, //注意这里要设置为true，否则无效，自动打开
        // filename: "stats.html", //分析图生成的文件名
        filename: "visualizer/stats.html",
        gzipSize: true, // 收集 gzip 大小并将其显示
        brotliSize: true, // 收集 brotli 大小并将其显示
      }),
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
        // 将 d.ts 文件生成在 src 目录下
        dts: "src/auto-imports.d.ts",
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ["ep"],
          // }),
          ElementPlusResolver(),
        ],
        // 将 d.ts 文件生成在 src 目录下
        dts: "src/components.d.ts",
      }),
      // Icons({
      //   autoInstall: true,
      // }),
    ],
    build: {
      // 打包生产环境，清除console和debugger
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // },
      outDir: "../dist", //打包的文件夹名称 默认 dist
      // assetsDir: "assets", //静态资源打包文件夹名称
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"], //打包目标兼容浏览器
      chunkSizeWarningLimit: 500, //打包文件多大警告  默认500kb
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL("index.html", import.meta.url)),
        },
        output: {
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return 'vendor'
          //   }
          //   // if (id.includes('node_modules')) {
          //   //   return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   // }
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值  默认 "[name].js"
          entryFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名, 默认"assets/[name]-[hash][extname]"
          // assetFileNames: "[ext]/[name].[hash].[ext]",
          assetFileNames(assetsInfo) {
            const extNames = [".png", ".jpg", ".svg", ".webp", ".gif", ".jpeg"];
            if (assetsInfo?.name?.endsWith(".css")) {
              return "css/[name].[hash].[ext]";
            }
            if (extNames.some((ext) => assetsInfo?.name?.endsWith(ext))) {
              return "images/[name].[hash].[ext]";
            }
            return "assets/[ext]/[name].[hash].[ext]";
          },
          // // 用于命名代码拆分时创建的共享块的输出命名 默认 "[name]-[hash].js"
          chunkFileNames: "js/[name].[hash].js",
          // // 拆分js到模块文件夹
          // chunkFileNames: (chunkInfo) => {
          //   const facadeModuleId = chunkInfo.facadeModuleId
          //     ? chunkInfo.facadeModuleId.split('/')
          //     : []
          //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          //   return `js/${fileName}/name.[hash].js`
          // }
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 variables.scss
          additionalData: `@import "@/assets/style/variables.scss";`,
        },
      },
    },
  };
});
