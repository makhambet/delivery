import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Cart from './views/Cart.vue'
import Chosen from './views/Chosen.vue'
import Good from './views/Good.vue'
import Profile from './views/Profile.vue'
import Signin from './views/Signin.vue'
import Special from './views/Special.vue'
import Payment from './views/Payment.vue'
import Confirm from './views/Confirm.vue'
import Registr from './views/Registr.vue'
import All from './views/all.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/chosen',
      name: 'chosen',
      component: Chosen
    },
    {
      path: '/good:id',
      name: 'good',
      component: Good
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },  
    {
      path: '/special',
      name: 'special',
      component: Special
    },   
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },   
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },  
    {
      path: '/registr',
      name: 'registr',
      component: Registr
    },  
    {
      path: '/all',
      name: 'all',
      component: All
    },    
  ]
})
