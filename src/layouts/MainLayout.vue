<template>
  <q-layout view="lHh Lpr lFf">
    <store-header :user="user" @showCategoryDrawer="categoryDrawerOpen = !categoryDrawerOpen"/>
    <q-drawer
      dark
      :content-style="{ backgroundColor: 'red' }"
      :width="250"
      show-if-above
      v-model="categoryDrawerOpen"
      bordered
      content-class="bg-grey-1"
      :breakpoint="765"
    >
      <q-btn label="Products" @click="$router.push({name:'AllProducts'})" /> 
      <!-- TODO: dodati korisnicki red sa slikom,imenom, i panelom za opcije -->
      <!-- TODO: dodati opcioni panel LOGIN/REGISTER umjesto ovoga ako korisnik nije ulogovan -->
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
import { authUser, loggedUser, getUserFirebase } from "../services/firebase/userservices";
import serverCon from "../boot/serverConnection";
import { auth } from 'firebase';
export default {
  name: 'MainLayout',
  data () {
    return {
      categoryDrawerOpen: false,   
      transitionName: "",
      user: null
    }
  },
  async beforeMount()  {
    // Provjeravamo je li ruta koju korisnik smije da koristi ako nije ulogovan
    this.$router.beforeEach(async (to, from, next) => {

      this.user = await this.getUserIfLogged();
      const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

      if (requiresAuth && this.user === null) {
        next({ path: "/login"});
      } else next();
    });
  },
  async updated() {
    if(this.user === null) {
      this.user = await this.getUserIfLogged();
    }
  },
  methods: {  
    async getUserIfLogged() {
      const aUser = authUser();
      if(aUser !== null) {
        try {
          return await getUserFirebase(aUser.uid);
        } catch(error) {
          return null;
        }
      }
      return null;
    }
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
    "category" : () => import("../components/products/Category")
  }
}
</script>

<style lang="scss" scoped>
aside.q-drawer--left.q-drawer--bordered {
  border-right: 2px solid black;
}
</style>
