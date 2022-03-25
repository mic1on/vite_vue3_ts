import { defineConfig, loadEnv } from 'vite'
import path from 'path'
//@ts-ignore
import viteCompression from 'vite-plugin-compression'
import { createVitePlugins } from './build/plugins'
import { parseEnvParams } from './build/buildHelper'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const envConf = parseEnvParams(loadEnv(mode, root))
  const { VITE_PORT, VITE_DROP_CONSOLE } = envConf
  return {
    base: './', //打包路径
    plugins: createVitePlugins(envConf, command === 'build'),
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      https: false,
      proxy: {},
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      terserOptions: {
        compress: {
          warnings: false,
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
    },
  }
})
