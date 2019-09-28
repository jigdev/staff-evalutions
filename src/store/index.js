import Vue from 'vue'
import Vuex from 'vuex'
import listing from './listing'
import banner from './banner'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        listing,
        module,
        banner
    }
})
