import { createStore } from "vuex";
import auth from './auth/index.js'
const default_state={

};
export default createStore({
    state:default_state,
    mutations:{
        add_pictures(state, payload) {
            state.pictures.push({'type':payload.type,'picture':payload.picture,'path':payload.path})
        },
        RESET_STATE(state) {
            // Object.assign(state, createStore())
            Object.assign(state, default_state)
            // console.log(state)
        },
    },
    actions: {

    },
    modules:{
        auth,
    },
})