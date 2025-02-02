import type { App } from 'vue'
import { createPinia } from 'pinia'
const store = createPinia()
export function setupPiniaStore(app: App<Element>) {
  app.use(store)
}
export { store }
