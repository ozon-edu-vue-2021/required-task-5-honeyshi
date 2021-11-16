import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("../pages/ProductListing.vue"),
    },
    {
      path: "/shopping-cart",
      component: () => import("../pages/ShoppingCart.vue"),
    },
    {
      path: "/favourites",
      component: () => import("../pages/Favourites.vue"),
    },
  ],
});
