import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user_id from './help/user_id'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods:[],
    order:[],
    cities: [],
    user_by_id: [],
    basket_list: [],
    offices: [],
    orders: [],
    basket_count: 0,
    cats: []
  },
  mutations: {
    SET_GOODS(state, payload){
      state.goods = payload
    },
    SET_CITIES(state, payload){
      state.cities = payload
    },
    SET_CATS(state, payload){
        state.cats = payload
      },
    SET_USER_BY_ID(state, payload){
      state.user_by_id = payload
    },
    SET_BASKET_LIST(state, payload){
      state.basket_list = payload
    },
    SET_OFFICES(state, payload){
      state.offices = payload
    },
    SET_ORDERS(state, payload){
      state.orders = payload
    },
    SET_BASKET_COUNT(state, payload){
      state.basket_count = payload
    }
  },
  actions: {
    GET_GOODS: async (context, payload) => {
      let name
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.login = false
      }
      else{
        await axios.get('http://localhost:8080/api/products', {
          headers: {
            "token": user_id.token
          }
        })
        .then(response => (
          name = response.data.result.data
        ))
        .catch(e => {
          console.log(e)
        })
        context.commit('SET_GOODS', name);
        localStorage.login = true
      }
    },
    GET_CITIES: async (context, payload) => {
        let name
        await axios.get('http://localhost:8080/api/cities')
        .then(response => (
            name = response.data.result
        ))
        .catch(e => {
            // console.log(e)
        })
        context.commit('SET_CITIES', name);
    },
    GET_CATS: async (context, payload) => {
        let name
        if(user_id.token === null || user_id.token === 'null'){
          localStorage.login = false
        }
        else{
            await axios.get('http://localhost:8080/api/cats', {
            headers: {
                "token": 'my_token'
            }
            })
            .then(response => (
                name = response.data.result
            ))
            .catch(e => {
                console.log(e)
            })
            context.commit('SET_CATS', name);
            localStorage.login = true
        }
    },
    GET_USER_BY_ID: async (context, payload) => {
      if(user_id.id === null || user_id.id === 'undefined' || user_id.id === 'null' || user_id.id === undefined){
        localStorage.login = false
      }
      else{
        let id = 'http://localhost:8080/api/user?user_id=' + user_id.id
        let name
        await axios.get(id)
        .then(response => (
          name = response.data.result
        ))
        .catch(e => {
        //   console.log(e.response)
        })
        context.commit('SET_USER_BY_ID', name);
        localStorage.login = true
      }
    },
    GET_BASKET_LIST: async (context, payload) => {
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.login = false
      }
      else{
        let name,count
        await axios.get('http://localhost:8080/api/basket/list', {
          headers: {
            "token": user_id.token
          }
        })
        .then(response => (
          name = response.data.result,
          count = name.length
        ))
        .catch(e => {
          // console.log(e.response)
          e.response.status === 404 ? count = 0 : ''
        })
        context.commit('SET_BASKET_LIST', name);
        context.commit('SET_BASKET_COUNT', count);
        localStorage.login = true
      }
    },
    GET_ORDERS: async (context, payload) => {
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.login = false
      }
      else{
        let name
        await axios.get('http://localhost:8080/api/orders', {
          headers: {
            "token": user_id.token
          }
        })
        .then(response => (
          name = response.data.result
        ))
        .catch(e => {
        //   console.log(e.response)
        })
        context.commit('SET_ORDERS', name);
        localStorage.login = true
      }
    },
    GET_OFFICES: async (context, payload) => {
      let name
      await axios.get('http://localhost:8080/api/offices')
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        // console.log(e.response)
      })
      context.commit('SET_OFFICES', name);
    },
    POST_ADD_BASKET: async(context, payload) => {
      if(localStorage.token !== null){
        axios.post('http://localhost:8080/api/basket/add', payload,
        {
          headers: {
            "token": user_id.token
          }
        })
        .then(response => { 
          console.log(response)
          this.$store.dispatch('GET_BASKET_LIST')
        })
        .catch(error => {
            console.log(error.response)
        });
      }
    }
  },
  getters: {
    GOODS: (state) => state.goods,
    CITIES: (state) => state.cities,
    CATS: (state) => state.cats,
    USER_BY_ID: (state) => state.user_by_id,
    BASKET_LIST: (state) =>  state.basket_list,
    OFFICES: (state) => state.offices,
    ORDERS: (state) => state.orders,
    BASKET_COUNT: (state) => state.basket_count,
  },
})
