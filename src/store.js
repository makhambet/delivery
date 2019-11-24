import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user_id from './help/user_id'
const url = 'http://server.zakaz-online.kz:9999/'


var goodLength;
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
    order_count: 0,
    goods_length: 0,
    order_length: 0,
    cats: [],
    filter_cats: [],
    search: [],
    favorite_list: [],
    favorite_count: 0,
    pricemin: 0,
    pricemax: 10000,
    cat_id: [],
    reserted: false,
    filter_subcats: [],
    special_accept: 400,
    special_request: 400,
    news: [],
    similar: [],
    bestsellers: [],
    product_show: [],
    filter_sub_subcats: [],
    order_id: [],
    
  },
  mutations: {
    SET_GOODS(state, payload){
      state.goods = payload;
    },
    SET_CITIES(state, payload){
      state.cities = payload;
    },
    SET_CATS(state, payload){
        state.cats = payload;
      },
    SET_FILTER_CATS(state, payload){
      state.filter_cats = payload;
    },
    SET_USER_BY_ID(state, payload){
      state.user_by_id = payload;
    },
    SET_BASKET_LIST(state, payload){
      state.basket_list = payload;
    },
    SET_OFFICES(state, payload){
      state.offices = payload;
    },
    SET_ORDERS(state, payload){
      state.orders = payload;
    },
    SET_BASKET_COUNT(state, payload){
      state.basket_count = payload
    },
    SET_ORDER_COUNT(state, payload){
      state.order_count = payload;
    },
    SET_SEARCH(state, payload){
      state.search = payload;
    },
    SET_FAVORITE_LIST(state, payload){
      state.favorite_list = payload;
    },
    SET_FAVORITE_COUNT(state, payload){
      state.favorite_count = payload;
    },
    SET_PRICEMIN(state, payload){
        state.pricemin = payload;
    },
    SET_PRICEMAX(state, payload){
        state.pricemax = payload;
    },
    SET_CAT_ID(state, payload){
      state.cat_id = payload;
    },
    SET_RESERTED(state, payload){
      state.reserted = payload;
    },
    SET_FILTER_SUBCATS(state, payload){
      state.filter_subcats = payload;
    },
    SET_SPECIAL_ACCEPT(state, payload){
      state.special_accept = payload;
    },
    SET_SPECIAL_REQUEST(state, payload){
      state.special_request = payload;
    },
    SET_NEWS(state, payload){
      state.news = payload;
    },
    Set_ORDER_LENGTH(state, payload){
      state.order_length = payload;
    },
    SET_GOODS_LENGTH(state, payload){
      state.goods_length = payload;
    },
    SET_SIMILAR(state, payload){
      state.similar = payload;
    },
    SET_BESTSELLERS(state, payload){
      state.bestsellers = payload;
    },
    SET_PRODUCT_SHOW(state, payload){
      state.product_show = payload;
    },
    SET_FILTER_SUB_SUBCATS(state, payload){
      state.filter_sub_subcats = payload;
    },
    SET_ORDER_ID(state, payload){
      state.order_id = payload;
    }
  },
  actions: {
    GET_GOODS: async (context, payload) => {
      let name
      await axios.get(url + 'api/products', payload,{
        payload,
        headers: {
          "token": localStorage.delivery_token || 'my_token'
        }
      })
      .then(response => (
        name = response.data.result.data,
        goodLength = response.data.result.count_date
      ))
      .catch(e => {
        goodLength = 0;
      })
      context.commit('SET_GOODS', name);
      context.commit('SET_GOODS_LENGTH', goodLength)
    },
    GET_CITIES: async (context, payload) => {
        let name
        await axios.get(url + 'api/cities')
        .then(response => (
            name = response.data.result
        ))
        .catch(e => {
            // console.log(e)
        })
        context.commit('SET_CITIES', name);
    },
    GET_SEARCH: async (context, payload) => {
      if(payload){
        let name
        await axios.get(url + 'api/search', payload,
        {
          headers: {
            'token': localStorage.delivery_token || 'my_token'
          }
        }
        )
        .then(response => (
          name = response.data.result.data,
          context.commit('SET_GOODS_LENGTH', response.data.result.count_date),
          context.commit('SET_SEARCH', name)
        ))
        .catch(e => {
          context.commit('SET_GOODS_LENGTH', goodLength)
          if(e.response.status === 400)
          {
            context.commit('SET_SEARCH', 400)
          }
          else if(e.response.status === 404)
            context.commit('SET_SEARCH', 404)
        })
        // context.commit('SET_SEARCH', name);
      }
    },
    GET_CATS: async (context, payload) => {
      let name
      await axios.get(url + 'api/cats', 
      {  
        // params: {
        //   'parent_id': '1'
        // },    
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      })
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        
      })
      context.commit('SET_CATS', name);
    },
    GET_FILTER_CATS: async (context, payload) => {
      let name, qwer = url + 'api/subCats/' + payload[0].id;
      await axios.get(qwer,
      {  
        // params: {
        //   'parent_id': '7'
        // },
        // payload,
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      }
      )
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        
      })
      context.commit('SET_FILTER_CATS', name);
    },
    GET_FILTER_SUBCATS: async (context, payload) => {
      let name, qwer = url + 'api/subCats/' + payload[0].id;
      await axios.get(qwer,
      {  
        // params: {
        //   'parent_id': '7'
        // },
        // payload,
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      }
      )
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        
      })
      context.commit('SET_FILTER_SUBCATS', name);
    },
    GET_FILTER_SUB_SUBCATS: async (context, payload) => {
      let name, qwer = url + 'api/subCats/' + payload[0].id;
      await axios.get(qwer,
      {  
        // params: {
        //   'parent_id': '7'
        // },
        // payload,
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      }
      )
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        
      })
      context.commit('SET_FILTER_SUB_SUBCATS', name);
    },
    GET_USER_BY_ID: async (context, payload) => {
      if(user_id.id === null || user_id.id === 'undefined' || user_id.id === 'null' || user_id.id === undefined){
        localStorage.delivery_login = false
      }
      else{
        let id = url + 'api/user?user_id=' + user_id.id
        let name
        await axios.get(id)
        .then(response => (
          name = response.data.result
        ))
        .catch(e => {
          
        })
        context.commit('SET_USER_BY_ID', name);
        localStorage.delivery_login = true
      }
    },
    GET_BASKET_LIST: async (context, payload) => {
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.delivery_login = false
      }
      else{
        let name,count
        await axios.get(url + 'api/basket/list', {
          headers: {
            "token": localStorage.delivery_token
          }
        })
        .then(response => (
          name = response.data.result,
          count = name.length
        ))
        .catch(e => (
          
          count = 0
        ))
        context.commit('SET_BASKET_LIST', name);
        context.commit('SET_BASKET_COUNT', count);
        localStorage.delivery_login = true
      }
    },
    GET_ORDERS: async (context, payload) => {
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.delivery_login = false
      }
      else{
        let name, count
        await axios.get(url + 'api/orders', payload, {
          headers: {
            "token": localStorage.delivery_token
          }
        })
        .then(response => (
          name = response.data.result.data,
          count = name.length,
          context.commit('Set_ORDER_LENGTH', response.data.result.count_date)
        ))
        .catch(e => {
          if(e.response.status === 404) count = 0
        })
        context.commit('SET_ORDERS', name);
        context.commit('SET_ORDER_COUNT', count);
        localStorage.delivery_login = true
      }
    },
    GET_FAVORITE_LIST: async (context, payload) => {
      if(user_id.token === null || user_id.token === 'null'){
        localStorage.delivery_login = false
      }
      else{
        let name, count
        await axios.get(url + 'api/favorite/list', {
          headers: {
            "token": user_id.token
          }
        })
        .then(response => (
          name = response.data.result,
          count = name.length
        ))
        .catch(e => {
          count = 0
        })
        context.commit('SET_FAVORITE_LIST', name);
        context.commit('SET_FAVORITE_COUNT', count);
        localStorage.delivery_login = true
      }
    },
    GET_OFFICES: async (context, payload) => {
      let name
      await axios.get(url + 'api/info/offices')
      .then(response => (
        name = response.data
      ))
      .catch(e => {
        
      })
      context.commit('SET_OFFICES', name);
    },
    POST_ADD_BASKET: async(context, payload) => {
      if(localStorage.delivery_token !== null){
        axios.post(url + 'api/basket/add', payload,
        {
          params: {

          },
          headers: {
            "token": user_id.token
          }
        })
        .then(response => { 
          // console.log(response)
        })
        .catch(error => {
            // console.log(error.response)
        });
      }
    },
    POST_SUBSCRIBE_BASKET: async(context, payload) => {
      if(localStorage.delivery_token !== null){
        axios.post(url + 'api/basket/subtract', payload,
        {
          params: { },
          headers: { "token": localStorage.delivery_token }
        })
        .then(response => { 
          // console.log(response)
        })
        .catch(error => {
            // console.log(error.response)
        });
      }
    },
    POST_FAVORITE: async(context, payload) => {
      if(localStorage.delivery_token !== null){
        await axios.post(url + 'api/favorite', payload,
        {
          params:{

          },
          headers: {
            "token": localStorage.delivery_token
          }
        })
        .then(response => { 
          // console.log(response)
        })
        .catch(error => {
            // console.log(error.response)
        });
      }
    },
    POST_SPECIAL: async(context, payload) => {
      if(localStorage.delivery_token !== null){
        let name = payload[1].name;
        let setName, urlName;
        let request = payload[0];
        switch (name) {
          case 'request':
            urlName = url + 'api/special/request';
            setName = 'SET_SPECIAL_REQUEST';
            break;
          case 'accept':
            urlName = url + 'api/special/accept';
            setName = 'SET_SPECIAL_ACCEPT';
            break;
        }
        await axios.post(urlName, request,
        {
          headers: {
            'token': localStorage.delivery_token
          }
        })
        .then(response => { 
          context.commit(setName, response.status)
        })
        .catch(error => {
            // console.log(error.response)
        });
      }
    },
    GET_PRICE: async(context, payload) => {
      await axios.get(url + 'api/prices')
      .then(responce => (
        context.commit('SET_PRICEMIN', responce.data.result.min),
        context.commit('SET_PRICEMAX', responce.data.result.max)
      ))
    },
    GET_NEWS: async(context, payload) => {
      let name;
      if(localStorage.delivery_token !== null){
        await axios.get(url + 'api/news/web', payload,
        {
          headers: {
            'token': localStorage.delivery_token
          }
        })
        .then(response => {
          name = response.data.result
          context.commit('SET_NEWS', response.data.result)
        })
        .catch(error => {
            // console.log(error.response)
        });
        
        context.commit('SET_NEWS', name)
      }
    },
    GET_SIMILAR: async (context, payload) => {
      let name, qwer = url + 'api/buysWith/' + payload
      await axios.post(qwer, payload,
      {  
        params: {
        //   'parent_id': '7'
        },
        // payload,
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      })
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        // console.log(e.response)
      })
      context.commit('SET_SIMILAR', name);
    },
    GET_PRODUCT_SHOW: async(context, payload) => {
      let data, setName, urlName,
          id = payload;
      await axios.get(url + 'api/product', {
          params: {
            id: id
          },
          headers: {
              token: localStorage.delivery_token || 'my_token'
          }
      })
      .then(response => (
          data = response.data.result
      ))
      .catch(e => {

        }
          // console.log(e.response)  
      )
      context.commit('SET_PRODUCT_SHOW', data)
    },
    POST_ORDER_ID: async (context, payload) => {
      let name
      await axios.get(url + 'api/order/' + payload, 
      {  
        // params: {
        //   'parent_id': '1'
        // },    
        headers: {
          'token': localStorage.delivery_token || 'my_token'
        }
      })
      .then(response => (
        name = response.data.result
      ))
      .catch(e => {
        
      })
      context.commit('SET_ORDER_ID', name);
    },
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
    ORDER_COUNT: (state) => state.order_count,
    SEARCH: (state) => state.search,
    FAVORITE_LIST: (state) => state.favorite_list,
    FAVORITE_COUNT: (state) => state.favorite_count,
    FILTER_CATS: (state) => state.filter_cats,
    PRICEMIN: (state) => state.pricemin,
    PRICEMAX: (state) => state.pricemax,
    CAT_ID: (state) => state.cat_id,
    RESERTED: (state) => state.reserted,
    FILTER_SUBCATS: (state) => state.filter_subcats,
    FILTER_SUB_SUBCATS: (state) => state.filter_sub_subcats,
    SPECIAL_ACCEPT: (state) => state.special_accept,
    SPECIAL_REQUEST: (state) => state.special_request,
    NEWS: (state) => state.news,
    ORDER_LENGTH: (state) => state.order_length,
    GOODS_LENGTH: (state) => state.goods_length,
    SIMILAR: (state) => state.similar,
    PRODUCT_SHOW: (state) => state.product_show,
    ORDER_ID: (state) => state.order_id,
  },
})
