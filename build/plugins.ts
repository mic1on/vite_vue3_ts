import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import compressPlugin from 'vite-plugin-compression'
import viteCompression from 'vite-plugin-compression'
// import pkg from "../package.json";
import html from 'vite-plugin-html'
/**
 * 注册 Vite 插件
 * @param envConfig 环境配置
 * @param isBuild 是否打包模式
 * @returns
 */
export function createVitePlugins(envConfig: EnvConfigType, isBuild: boolean) {
  // eslint-disable-next-line no-console
  console.log('环境参数:', envConfig)
  const { VITE_BUILD_COMPRESS_STRATEGY, VITE_BUILD_DELETE_ORIGIN_FILE } = envConfig
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    //vue SFC name support
    vueSetupExtend(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // dirs: ["src/components"],
      deep: true,
      dts: 'src/auto-components.d.ts',
      resolvers: [
        //auto import Naive UI Components
        //https://github.com/antfu/unplugin-vue-components
        //全局引入的话，就不需要这里自动组件注册了
        {
          type: 'component',
          resolve: (name: string) => {
            //n-el fullname is n-element?
            if ('NEl' === name) {
              name = 'NElement'
            }
            if (name.match(/^N[A-Z]/)) {
              return { importName: name, path: 'naive-ui' }
            }
          },
        },
      ],
    }),
    PurgeIcons({ iconSource: 'local' }),
  ]
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(envConfig, isBuild))
  if (isBuild) {
    //Compress
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS_STRATEGY, VITE_BUILD_DELETE_ORIGIN_FILE)
    )
  }
  return vitePlugins
}
function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(',')
  const plugins: Plugin[] = []
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      })
    )
  }
  return plugins
}
//html inject
function configHtmlPlugin(env: EnvConfigType, isBuild: boolean) {
  const { VITE_APP_NAME } = env
  //public 下的全局配置文件
  const getAppConfigSrc = () => {
    return `/assets/app.config.js?v=${new Date().getTime()}`
  }
  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_APP_NAME,
      },
      // global config file inject
      tags: [
        {
          tag: 'script',
          attrs: {
            src: getAppConfigSrc(),
          },
        },
      ],
    },
  })
  return htmlPlugin
}
