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
      heading: "Hey, Admin",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
    beforeEnter: requireAuth,
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
    path: "/transactions",
    name: "Transactions",
    meta: {
      heading: "Transactions",
      isShowFooter: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "transactions" */ "../views/transactions.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/edit-transactions/:id",
    name: "EditTransactions",
    meta: {
      heading: "Edit transactions",
      isShowFooter: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "edit-transactions" */ "../views/edit-transactions.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/category",
    name: "Category",
    meta: {
      heading: "Category",
    },
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/category.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/edit-category/:id",
    name: "EditCategory",
    meta: {
      heading: "Eidt category",
    },
    component: () =>
      import(
        /* webpackChunkName: "edit-category" */ "../views/edit-category.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/new-category",
    name: "NewCategory",
    meta: {
      heading: "Add Category",
    },
    component: () =>
      import(
        /* webpackChunkName: "new-category" */ "../views/new-category.vue"
      ),
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
