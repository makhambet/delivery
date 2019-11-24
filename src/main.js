import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.css'
import Vuelidate from 'vuelidate'
import user from './help/user_id'
import AccountKit from 'vue-facebook-account-kit'
import * as VueGoogleMaps from 'vue2-google-maps'
import './help/ml'

Vue.use(AccountKit, {
  init: {
    appId:"992075960963748", 
    state:"{{csrf}}", 
    version:"v1.0",
    fbAppEventsEnabled:true,
  }
})
Vue.use(Vuelidate)
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDYjhd-JDSwGWuiZBp_27RfSMOSCB-mTBQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // localStorage.clear();
      this.$store.dispatch('GET_SEARCH', {
        params: {
            text: this.searchModel
        },
        headers: {
            token: 'my_token'
        }
    })
    this.$store.dispatch('GET_GOODS', {
      params: {
          'page': '1'
      },
      headers: {
        "token": localStorage.delivery_token || 'my_token'
      }
    })
    this.$store.dispatch('GET_PRICE')
    this.$store.dispatch('GET_CITIES')
    this.$store.dispatch('GET_CATS')
    this.$store.dispatch('GET_OFFICES')
    if(user.token !== null){
      this.$store.dispatch('GET_USER_BY_ID')
      // this.$store.dispatch('GET_ORDERS')
      this.$store.dispatch('GET_BASKET_LIST')
      this.$store.dispatch('GET_FAVORITE_LIST')
    }
  },
}).$mount('#app')
