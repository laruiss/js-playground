import { createApp } from 'vue'
import VueScrollTo from 'vue-scrollto'
import { FontAwesomeIcon } from './plugins/fontawesome'

import './main.css'
import 'highlight.js/styles/vs2015.css'

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .use(VueScrollTo)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app')
