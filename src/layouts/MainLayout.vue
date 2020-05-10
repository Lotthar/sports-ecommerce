<template>
  <q-layout view="lHh Lpr lFf">
    <store-header :user="user" @showCategoryDrawer="categoryDrawerOpen = !categoryDrawerOpen"/>
    <q-drawer
      elevated
      dark
      :width="250"
      no-swipe-backdrop
      show-if-above
      v-model="categoryDrawerOpen"
      bordered
      content-class="bg-grey-4 border-right-primary"
      :breakpoint="765"
    >
      <q-btn label="Products" @click="$router.push({name:'AllProducts'})" /> 
      <!-- TODO: dodati korisnicki red sa slikom,imenom, i panelom za opcije -->
      <!-- TODO: dodati opcioni panel LOGIN/REGISTER umjesto ovoga ako korisnik nije ulogovan -->
      <!-- TODO:  Dodati listu kategorija sa odredjenom tranzicijom-->
      <sections />
      <category 
        v-for="category in categories" 
        :key="category.id" 
        :category="category"/>
    </q-drawer>

    <q-page-container>
      <transition :name="transitionName">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { getAllCategories } from "../services/firebase/productservice";
import { authUser, getUserFirebase } from "../services/firebase/userservices";
import serverCon from "../boot/serverConnection";
import { auth } from 'firebase';
export default {
  name: 'MainLayout',
  data () {
    return {
      categoryDrawerOpen: false,   
      transitionName: "",
      user: null,
      categories: []
    }
  },
  async beforeMount() {
    // Provjeravamo je li ruta koju korisnik smije da koristi ako nije ulogovan
    await this.loadProductCategories();
    this.$router.beforeEach(async (to, from, next) => {

      this.user = await this.getUserIfLogged();
      const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

      if (requiresAuth && this.user === null) {
        next({ path: "/login"});
      } else {
        next();
      }
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
    },
    async loadProductCategories() {
      this.categories = await getAllCategories();
      
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
    "category" : () => import("../components/products/Category"),
    "sections" : () => import("../components/products/Section")
  }
}
</script>

<style lang="scss" scoped>

</style>
