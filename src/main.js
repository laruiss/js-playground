import { createApp } from 'vue'
import VueScrollTo from 'vue-scrollto'

import { FontAwesomeIcon } from './plugins/fontawesome'

import './main.css'
import 'highlight.js/styles/vs2015.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueScrollTo)
  .component('fa-icon', FontAwesomeIcon)

app.config.globalProperties.window = window
app.mount('#app')
