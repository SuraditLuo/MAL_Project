import { createStore } from "vuex";
import loginService from "../services/LoginService";
import animeService from "@/services/AnimeService";
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
    suggest: "",
    selectedAnime: {},
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
    currentUser: { id: "", username: "", favorites: [] },
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
        this.commit("addIds");
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
    RemoveFromList() {
      let anime = this.state.selectedAnime;
      console.log(anime.name);
      this.commit("RemoveSuccess", anime);
      alert("Successfully remove this anime into your list.");
    },
  },
  mutations: {
    RemoveSuccess(state, anime) {
      animeService.removeMatchingObject(state.currentUser.favorites, anime);
      // add rank
      animeService.addRank(state.currentUser.favorites);
      // find a matching user list, then do something
      let selectedUser = state.users.find(
        (user) => user.username === state.currentUser.username
      );
      console.log(state.currentUser);
      if (selectedUser) {
        //do something
        selectedUser.favorites = state.currentUser.favorites;
      }
      console.log(state.users);
      router.push("#");
    },
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
      // add rank
      animeService.addRank(state.currentUser.favorites);
      // find a matching user list, then do something
      let selectedUser = state.users.find(
        (user) => user.username === state.currentUser.username
      );
      console.log(state.currentUser);
      if (selectedUser) {
        //do something
        selectedUser.favorites = state.currentUser.favorites;
      }

      console.log(state.users);
    },
    resetState(state) {
      this.state.loggedIn = false;
      state.currentUser = { id: "", username: "", favorites: [] };
      if (
        router.currentRoute.value.fullPath == "/favorite" ||
        router.currentRoute.value.fullPath == "/discovery"
      ) {
        router.push("/");
      } else {
        router.push("");
      }
    },
    loginSuccess(state) {
      state.loggedIn = true;
      state.currentUser = {
        id: "",
        username: this.state.username,
        favorites: [],
      };
      let selectedUser = state.users.find(
        (user) => user.username === state.currentUser.username
      );
      if (selectedUser) {
        state.currentUser.favorites = selectedUser.favorites;
        state.currentUser.id = selectedUser.id;
      }
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
    setSelectedAnime(state, object) {
      console.log(object.name);
      state.selectedAnime = object;
      console.log(state.selectedAnime);
    },
    addIds(state) {
      state.users.forEach((user, index) => {
        user.id = index;
      });
    },
  },
  getters: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
