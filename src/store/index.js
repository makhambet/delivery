import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user_id from './help/user_id'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)


export default new Vuex.Store({
    modules:{
        getters,
        mutations,
        actions,
        state
    }



})