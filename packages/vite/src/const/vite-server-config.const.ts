import { commonContainer, CommonPathResolver } from '@tezjs/common';
import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'
import { tez } from "../domain/tez";
export const VITE_SERVER_CONFIG = (config?:UserConfig)=> {
  const pathResolver = new CommonPathResolver();
  return {
    root:commonContainer.buildOptions.rootDir,
    logLevel: 'info',
    envDir:'environments',
    resolve:{
      alias:[
        {find:'#client-env',replacement:`/node_modules/.cache/tez/client-env.ts`},
        {find:'#server-env',replacement:"/node_modules/.cache/tez/server-env.ts"},
        { find: '/tez.ts', replacement: "/node_modules/.cache/tez/tez.ts" },
        { find: '#store', replacement: "/store" },
        { find: '#router', replacement: "/router" }
      ]
    },
    optimizeDeps: {
      entries: [
        pathResolver.tezTsPath
      ],
      include: ['vue']
    },
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    build: {
      rollupOptions: {
        output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
        }
      }
      },
      plugins: [vue(),tez()]
  }
}