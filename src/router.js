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
import All from './views/All.vue'
import Orders from './views/Orders.vue'
import Order from './views/Order.vue'
import SpecialOk from './views/SpecialOk.vue'
import Products from './views/Products.vue'
import NewPassword from './views/NewPassword.vue'
import SpecialOrders from './views/SpecialOrders.vue'

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
      path: '/good/:id',
      name: 'good',
      props: true,
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
      component: All,
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      query: {
        page: null
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      query: {
        page: null
      }
    },
    {
      path: '/orders:id',
      name: 'order',
      props: true,
      component: Order
    }, 
    {
      path: '/special-ok',
      name: 'special_ok',
      component: SpecialOk
    }, 
    {
      path: '/new-password',
      name: 'new-password',
      component: NewPassword
    }, 
    {
      path: '/special-orders/:id',
      name: 'special-orders',
      props: true,
      component: SpecialOrders
    }, 
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
