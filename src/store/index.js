import { createStore } from "vuex";
import loginService from "../services/LoginService";
import router from "@/router";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
export default createStore({
  state: {
    loggedIn: false,
    givenScore: "",
    anime: "",
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
    currentUser: { username: "", favorites: [] },
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
        router.go(-1);
      } else {
        this.commit("loginFail");
        alert("Invalid username or password");
      }
    },
    logout() {
      this.commit("resetState");
    },
    AddToList() {
      this.commit("AddSuccess");
      alert("Successfully add this anime into your list.");
    },
  },
  mutations: {
    AddSuccess(state) {
      state.currentUser.favorites.push({
        id: state.anime.data.mal_id,
        name: state.anime.data.title,
        score: state.givenScore,
      });
      // sort the favorite list
      state.currentUser.favorites.sort((a, b) => {
        return b.score - a.score;
      });
      // find a matching user list, then set the favorite to current user favorite
      let selectedUser = state.users.find(
        (user) => user.username === state.currentUser.username
      );
      console.log(state.currentUser);
      if (selectedUser) {
        selectedUser.favorites = state.currentUser.favorites;
      }
      console.log(state.users);
    },
    resetState(state) {
      this.state.loggedIn = false;
      state.currentUser = null;
      if (router.currentRoute.value.fullPath == "/favorite") {
        router.go(-1);
      } else {
        router.push("");
      }
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
    setScoreInput(state, input) {
      state.givenScore = input;
      console.log(state.givenScore);
    },
  },
  getters: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
