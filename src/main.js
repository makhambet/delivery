import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.css'
import Vuelidate from 'vuelidate'
import user from './help/user_id'
Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    console.log(localStorage)
    if(user.token !== null){
      this.$store.dispatch('GET_GOODS')
      this.$store.dispatch('GET_CITIES')
      this.$store.dispatch('GET_USER_BY_ID')
      this.$store.dispatch('GET_OFFICES')
      this.$store.dispatch('GET_ORDERS')
      this.$store.dispatch('GET_BASKET_LIST')
      this.$store.dispatch('GET_CATS')
    }
  },
}).$mount('#app')
