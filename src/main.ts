import { createApp } from 'vue'
import App from './App.vue'
import { setupVueRouter } from '@/router'
import { setupPiniaStore } from '@/store'

const app = createApp(App)

setupPiniaStore(app)
setupVueRouter(app)

app.mount('#app')
