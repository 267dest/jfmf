import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './routes'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import { auth } from './firebase.js'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { firestorePlugin } from 'vuefire'
import {store} from './stores'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(VueMoment)
Vue.use(firestorePlugin)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VueRouter)


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
