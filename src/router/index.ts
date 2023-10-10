import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import * as paths from "@/routes";
import AppLayout from "@/layouts/AppLayout.vue";
import SignLayout from "@/layouts/SignLayout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: paths.HOME,
    component: AppLayout,
    children: [
      {
        path: "", // Empty path for the default child route
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/ArticlesView.vue"),
      },
      {
        path: paths.CREATE_ARTICLE,
        name: "new-article",
        component: () =>
          import(
            /* webpackChunkName: "createArticle" */ "@/views/ArticlesCreateView.vue"
          ),
      },
      {
        path: paths.ARTICLE,
        name: "article",
        component: () =>
          import(
            /* webpackChunkName: "article" */ "@/views/ArticleView.vue"
          ),
      },
    ],
  },
  {
    path: paths.LOGIN,
    component: SignLayout,
    children: [
      {
        path: "",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/LoginView.vue"),
      },
    ],
  },
  {
    path: paths.REGISTER,
    component: SignLayout,
    children: [
      {
        path: "",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/views/RegisterView.vue"
          ),
      },
    ],
  },

  // Fallback "not found" route for all other unmatched paths
  {
    path: "*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/NotFoundView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// Add a global navigation guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;
  if (to.matched.length === 0) {
    // If no route matches the destination, it's a 404
    next({ name: "not-found" });
    return;
  } 
  if (to.name === "login" && isAuthenticated) {
    // Redirect authenticated users away from the login page
    next({ name: "home" });
    return;
  }
  if (to.name === "register" && isAuthenticated) {
    // Redirect authenticated users away from the registration page
    next({ name: "home" });
    return;
  }

  if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
    // Redirect non-authenticated users to the login page
    next({ name: "login" });
    return;
  }

  // Allow navigation for other cases
  next();
});

export default router;
