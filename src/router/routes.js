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
        path: "/products",
        name: "AllProducts",
        component: () => import("pages/Products.vue")
      },
      {
        path: "/products/:productId",
        name: "SingleProduct",
        component: () => import("components/products/Product.vue")
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
