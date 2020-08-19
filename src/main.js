import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    }
  ]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
