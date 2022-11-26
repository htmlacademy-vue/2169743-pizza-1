export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "App",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "App",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "App",
    },
  },
];
