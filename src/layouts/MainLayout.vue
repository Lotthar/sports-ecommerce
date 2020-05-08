<template>
  <q-layout view="lHh Lpr lFf">
    <store-header @showCategoryDrawer="categoryDrawerOpen = !categoryDrawerOpen"/>
    <q-drawer
      :width="250"
      show-if-above
      v-model="categoryDrawerOpen"
      bordered
      content-class="bg-grey-1"
      :breakpoint="765"
    >
      <!-- TODO: dodati korisnicki red sa slikom,imenom, i panelom za opcije -->
      <!-- TODO: dodati opcioni panel LOGIN/REGISTER umjesto ovoga ako korisnik nije ulogovan -->
      <user-toolbar :user="user" />
      <!-- TODO:  Dodati listu kategorija sa odredjenom tranzicijom-->
      <category />
    </q-drawer>

    <q-page-container>
      <transition :name="transitionName">
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { authUser, loggedUser } from "../services/firebase/userservices";
import serverCon from "../boot/serverConnection";
export default {
  name: 'MainLayout',
  data () {
    return {
      categoryDrawerOpen: false,   
      transitionName: "",
      user: null
    }
  },
  beforeMount()  {
    // Provjeravamo je li ruta koju korisnik smije da koristi ako nije ulogovan
    this.$router.beforeEach((to, from, next) => {

      this.user = authUser();
      const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

      if (requiresAuth && this.user === null) {
        next({ path: "/login"});
      } else next();
    });
  },
  updated() {
    this.user = authUser();
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    "store-header" : () => import("../components/header/Header"),
    "category" : () => import("../components/products/Category"),
    "user-toolbar": () => import("../components/user/UserDrawerToolbar")
  }
}
</script>

<style lang="scss" scoped>

</style>
