import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//这里会报svgIcon.ts不在tsconfig.config.json文件列表中，在tsconfig.config.json的include里加
//"./src/icons/svgIcon.ts"就行，不加对npm run dev没影响
import { createSvg } from "./src/icons/svgIcon";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), createSvg("./src/icons/svg/")],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "https://lianghj.top:8888/api/private/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      "/api": {
        target: "https://lianghj.top:8888/api/private/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/styles/variables.scss";
        @import "@/styles/mixin.scss";
        
        `,
      },
    },
  },
});
