import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'

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
