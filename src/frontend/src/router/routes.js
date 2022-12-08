import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
];
