import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
import electron from "vite-plugin-electron"
import electronRenderer from "vite-plugin-electron-renderer" 
import polyfillExports from "vite-plugin-electron-renderer" 
import { fileURLToPath, URL } from 'node:url'

// export default defineConfig(({ mode }) => ({
//   base: mode == 'development' ? '' : './',
//   plugins: [
//     vue(),
//     electron([{
//       entry: "electron-main/index.ts", // 主进程文件
//     },
//     {
//       entry: 'electron-preload/preload.ts'
//     }
//   ]),
//     electronRenderer(),
//     polyfillExports(),
//   ],
//   build: {
//     emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
//     outDir: "dist-electron"
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     hmr:true,
//     port: 5000,
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:5050',
//         changeOrigin: true, //解决跨域
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// }))

export default defineConfig(({mode}) => {
  return {
    base: mode == 'development' ? '' : './',
    plugins: [
      vue(),
      electron([{
        entry: "electron-main/index.ts", // 主进程文件
      },
      {
        entry: 'electron-preload/preload.ts'
      }
    ]),
      electronRenderer(),
      polyfillExports(),
    ],
    build: {
      emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
      outDir: "dist-electron"
      },
    resolve: {
      alias: {
          "@": fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr:true,
      port: 7766,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5050',
          changeOrigin: true, //解决跨域
          // rewrite: (path) => path.replace(/^\/api/, '/api'),
        }
      }
    }
  } 
})