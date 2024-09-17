import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import { importGlobal } from "./utils/index";
import { projectAuth } from "./configs/firebase";
let app;
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    importGlobal(app);
    app.mount("#app");
  }
});
