import app from './app'
import storage from './storage'
import network from './network'
import theme from './theme'

export function getAppConfig() {
  ///读取env里的配置
  const { VITE_APP_NAME, VITE_SERVER_ROUTE, VITE_RECORD_LAST_ROUTE, VITE_API_URL } = import.meta.env
  return {
    VITE_APP_NAME,
    VITE_SERVER_ROUTE,
    VITE_RECORD_LAST_ROUTE,
    VITE_API_URL,
  }
}
export function getThemeConfig() {
  return theme
}

export default {
  app,
  storage,
  network,
  theme,
}
