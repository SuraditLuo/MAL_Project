import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AnimeDetailView from "../views/AnimeDetail.vue";
import AnimeService from "@/services/AnimeService.js";
import store from "@/store/index.js";
import UserFavoriteView from "../views/FavoriteListView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/anime/:id",
    name: "animeDetail",
    component: AnimeDetailView,
    beforeEnter: (to) => {
      return AnimeService.getAnime(to.params.id).then((response) => {
        store.state.anime = response.data;
        store.state.givenScore = "";
        console.log(store.state.anime);
      });
    },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: UserFavoriteView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
