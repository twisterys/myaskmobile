import authActions from './actions'
import authMutations from './mutations'
import authGetters from './getters'
export default{
    namespaced:true,
    state:{
        token: null,
        user: null,
    },
    mutations:authMutations,
    getters:authGetters,
    actions:authActions
}