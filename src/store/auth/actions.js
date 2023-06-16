import axios from "axios";



export default {
    async login({ commit }, payload) {
        const res = await axios.post("login", payload);
        commit("setToken", res.data.data.token);
        const user = JSON.stringify(res.data.data.user);
        commit("setUser", user);
        localStorage.setItem("user",user)
        localStorage.setItem("token",res.data.data.token)
    },

    logout({ commit }) {
        commit("setToken", null);
        commit("setUser", null);
        localStorage.setItem("token",null)
    },
};
