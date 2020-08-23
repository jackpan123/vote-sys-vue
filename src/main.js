import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import IndexPage from '@/components/IndexPage'
import Register from '@/components/Register'
import UserLogin from '@/components/UserLogin'
import VotingHall from '@/components/VotingHall'
import CreateVote from '@/components/CreateVote'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    {
      path: '/',
      component: IndexPage,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/login',
      component: UserLogin,
    },
    {
      path: '/votingHall',
      component: VotingHall,
    },
    {
      path: '/createVote',
      component: CreateVote,
    },
  ]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
