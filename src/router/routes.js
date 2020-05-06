const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "HomePage",
        component: () => import("pages/HomePage.vue")
      },
      {
        path: "products",
        name: "AllProducts",
        component: () => import("pages/Products.vue")
      },
      {
        path: "products/:productId",
        name: "SingleProduct",
        component: () => import("components/products/Product.vue")
      },
      {
        path: "users/:userId",
        name: "UserProfile",
        component: () => import("components/user/Profile.vue"),
        children: [
          {
            path: "orders",
            name: "UserOrders",
            component: () => import("components/user/Orders.vue")
          },
          {
            path: "cart",
            name: "UserOrders",
            component: () => import("components/user/Cart.vue")
          },
          {
            path: "/dmin",
            name: "AdminPage",
            component: () => import("components/user/AdminPage.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/signin",
    name: "SignInPage",
    component: () => import("layouts/SignIn.vue"),
    children: [
      {
        path: "",
        name: "LoginPage",
        component: () => import("components/user/LogIn.vue")
      },
      {
        path: "login",
        name: "LoginPage",
        component: () => import("components/user/LogIn.vue")
      },
      {
        path: "register",
        name: "RegisterPage",
        component: () => import("components/user/Register.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
