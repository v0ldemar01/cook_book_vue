import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import DKToast from "vue-dk-toast";
import { store, key } from "./store";

createApp(App)
  .use(store, key)
  .use(router)
  .use(DKToast)
  .component("PacmanLoader", PacmanLoader)
  .mount("#app");
