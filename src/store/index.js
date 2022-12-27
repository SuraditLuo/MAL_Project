import { createStore } from "vuex";
import loginService from "../services/LoginService";
import router from "@/router";
export default createStore({
  state: {
    loggedIn: false,
    users: [
      {
        username: "TokiDokor",
        password: "Milk@081",
        favorites: [],
      },
      {
        username: "user",
        password: "123",
        favorites: [],
      },
    ],
    currentUser: null,
    username: "",
    password: "",
  },
  actions: {
    login() {
      let result = loginService.login(
        this.state.username,
        this.state.password,
        this.state.users
      );
      if (result) {
        this.commit("loginSuccess");
        router.push("/");
      } else {
        this.commit("loginFail");
        alert("Invalid username or password");
      }
    },
    logout() {
      this.commit("resetState");
      router.push("/");
    },
  },
  mutations: {
    resetState(state) {
      this.state.loggedIn = false;
      state.currentUser = null;
    },
    loginSuccess(state) {
      state.loggedIn = true;
      state.currentUser = { username: this.state.username, favorites: [] };
      state.username = "";
      state.password = "";
    },
    loginFail(state) {
      state.loggedIn = false;
      state.username = "";
      state.password = "";
    },
    setUsernameInput(state, input) {
      state.username = input;
    },
    setPasswordInput(state, input) {
      state.password = input;
    },
  },
  getters: {},
  modules: {},
});
