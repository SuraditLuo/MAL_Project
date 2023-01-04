import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
const app = createApp(App).use(store).use(router).use(VueCookies);

VueCookies.set("myCookie", "value", {
  SameSite: "Strict",
  secure: true,
});

app.mount("#app");
