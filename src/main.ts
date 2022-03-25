import { createApp } from 'vue'
import App from './App.vue'
import GAppProvider from '@/components/GAppProvider.vue'
import { setupVueRouter } from '@/router'
import { setupPiniaStore } from '@/store'

const app = createApp(App)
const appProvider = createApp(GAppProvider)
appProvider.mount('#appProvider')
setupPiniaStore(app)
setupVueRouter(app)

app.mount('#app')
