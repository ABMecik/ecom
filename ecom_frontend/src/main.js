import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from 'axios'
import mixin from './mixin'
import Vue from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000'


export const eventBus = createApp(App)
eventBus.use(store)
eventBus.use(router, axios)
eventBus.use(installElementPlus)
eventBus.mixin(mixin)
eventBus.mount('#app');