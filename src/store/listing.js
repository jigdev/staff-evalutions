import ListingRepository from '@/api/ListingRepository'

// Mutation types
export const TYPES = {
    FETCH_LISTINGS: 'FETCH_LISTINGS',
    FETCH_LISTINGS_ACCESSORIES: 'FETCH_LISTINGS_ACCESSORIES',
    FETCH_LISTINGS_ADDONS: 'FETCH_LISTINGS_ADDONS',
    FETCH_LISTINGS_COUNT: 'FETCH_LISTINGS_COUNT',
    RESERVATION_LIST :'RESERVATION_LIST',
    USER : 'USER'
}

//Store state
const state = {
    listings: [],
    total: null,
    listOfReservations :[],
    user:{},
    addons :[],
    accessories:[]
}

//Actions
const actions = {

    fetch_listings_count({commit}) {
        ListingRepository.countAll().then(count => commit(TYPES.FETCH_LISTINGS_COUNT, count))
    },

    fetch_listings({commit}, params) {
        let itensPerPage = params.itensPerPage
        let page = params.page || 1
        ListingRepository.findAll(page, itensPerPage).then(data => {

            let accessories = data.filter((pr)=> {
                return pr.product_type == 'accessory';
            })
            commit(TYPES.FETCH_LISTINGS_ACCESSORIES,accessories);

            let addons = data.filter((pr)=> {
                return pr.product_type == 'addon';
            })
            commit(TYPES.FETCH_LISTINGS_ADDONS,addons);


            commit(TYPES.FETCH_LISTINGS, data)
        })
    },
    reservebike({commit}, params){
       let reservation = params.pr;
       state.listOfReservations.push(reservation.product);
       commit(TYPES.RESERVATION_LIST, state.listOfReservations);
    }

}

//Mutations
const mutations = {
    [TYPES.FETCH_LISTINGS](state, data) {
        state.listings = data
    },
    [TYPES.FETCH_LISTINGS_COUNT](state, count) {
        state.total = count
    },
    [TYPES.RESERVATION_LIST](state, list) {
        state.listOfReservations = list
    },
   [TYPES.FETCH_LISTINGS_ACCESSORIES](state, list) {
        state.accessories = list
    },
    [TYPES.FETCH_LISTINGS_ADDONS](state, list) {
        state.addons = list
    }
}


export default {
    state,
    actions,
    mutations
}
