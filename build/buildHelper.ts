// @ts-ignore
import { Recordable } from 'vite-plugin-mock'
/**
 * 解析 Env 环境参数
 * @param envConf 通过 Vite 的loadEnv函数获得
 * @returns
 */
export function parseEnvParams(envConf: Recordable) {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
