import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (to.path.includes("cart") || to.path.includes("orders")) {
        return;
      }
      return { x: 0, y: 0 };
    },
    // Prije svake korisnicke rute gledati je li ulogovan i preusmjeravati ako nije
    routes,
    // TODO: Dodati beforeEach navigation guard da bi vidio
    //  da li korisnik smije da udje u stranicu
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
