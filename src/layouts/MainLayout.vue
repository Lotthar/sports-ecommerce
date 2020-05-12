<template>
  <q-layout view="lHh Lpr lFf">
    <store-header :user="user" @showCategoryDrawer="categoryDrawerOpen = !categoryDrawerOpen"/>
    <q-drawer
      elevated
      dark
      :width="270"
      no-swipe-backdrop
      show-if-above
      v-model="categoryDrawerOpen"
      bordered
      content-class="bg-grey-4 border-right-primary text-accent flex flex-column justify-evenly align-items-center"
      :breakpoint="765"
    >
      <h4>Products filtering</h4>
      <q-btn class="all-products" label="All Products" @click="$router.push({name:'AllProducts'})" /> 
      <div class="text-center text-primary gender-label">
        Gender Sections
      </div>
      <sections />
      <div class="text-center text-accent gender-label">
        Categories 
      </div>
      <category 
        v-for="category in categories" 
        :key="category.id" 
        :category="category"/>
    </q-drawer>

    <q-footer reveal>
      <q-toolbar>
          <q-toolbar-title><span>Sports-Wear 	&#xA9;</span>Web-store for sporting clothes and equipment. Welcome!</q-toolbar-title>
        </q-toolbar>
    </q-footer>

    <q-page-container>
      <transition :name="transitionName">
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
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
      this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'LOADING CATEGORIES....'
      });
      this.categories = await getAllCategories();
      this.$q.loading.hide();
    }
  },
  watch: {
    $route (to, from) {
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
.q-drawer{
  .q-btn.all-products {
    font-weight: bolder;
    background: $accent;
    color: $primary;
    width: 90%;
    margin: 5px auto;
    transition: 1s linear;
  }
  .q-btn.all-products:hover {
    transform: scale(1.03);
  }
  h4 {
    font-weight: bolder;
    padding: 0;
    color: $primary;
    margin: 3px auto;
  }
  div.gender-label {
    font-weight: bolder;
    font-size: 25px;
  }
}

.q-footer {
  color: $accent;
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  border-top: 2px solid $accent;
  .q-toolbar {
    color: white;
  }
  .q-toolbar__title {
    font-size: 15px;
  }
  span {
    display: inline-block;
    margin-right: 10px;
    color: $accent;
    font-size: 25px;
    font-weight: bolder;
  }
}

@media(max-width: 700px) {
  .q-toolbar__title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  span {
    font-size: 20px;
  }
}

</style>
