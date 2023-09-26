
export default{
    authenticated(state){
        if (state.token) {
            return state.token;
        } else {
            const token = localStorage.getItem('token');
            state.token = token;
        }
        return state.token;
    },
    user(state){
        if (state.user) {
            return state.user;
        } else {
            const user = localStorage.getItem('user');
            state.user = user;
        }
        return state.user;
    }
    ,
    verified(state){
        if (state.user){
            return state.user.email_verified_at;
        }else {
            const user = localStorage.getItem('user');
            state.user = user;
        }
        return state.user.email_verified_at;
    }
    /* userId(state){
        if(state.user == null){
            offlineStorage.get("user").then(res=>{
                store.commit("auth/setUser", JSON.parse(res));
                // console.log(state.user.id);
                return state.user.id;
            }).catch(()=>{
                store.dispatch("auth/logout")
            })
        }else{
            // console.log(state.user.id);
            if(state.user.id != null)
                return state.user.id;
            else
                store.dispatch("auth/logout")
        }
    } */
}