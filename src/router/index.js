import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "@/configs/firebase";
//import { onAuthStateChanged } from "firebase/auth";
const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login", params: {} });
  } else {
    next();
  }
};
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      heading: "Home",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/logout.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      heading: "Profile",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/report",
    name: "Report",
    meta: {
      heading: "Report",
    },
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/report.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/budget",
    name: "Budget",
    meta: {
      heading: "Budget",
    },
    component: () =>
      import(/* webpackChunkName: "budget" */ "../views/budget.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/new-transaction",
    name: "NewTransaction",
    meta: {
      heading: "Add Transaction",
      isShowFooter: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "new-transaction" */ "../views/new-transaction.vue"
      ),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
