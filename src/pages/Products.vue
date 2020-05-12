<template>
  <q-page>
    <product-card @addCart="openDialogCart" 
                  v-for="product in pageOfProducts" 
                  :key="product.id" 
                  :product="product" 
                  :user="user" />
    <q-separator />
    <jw-pagination v-if="products" :items="products" @changePage="onChangePage" style="display: flex;"></jw-pagination>
    <q-dialog v-model="addCartDialog" persistent>
        <q-card style="min-width: 350px" class="text-primary bg-accent">
          <q-card-section>
            <div class="text-h6">Dodajte proizvod u vaša kolica</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input 
            ref="amount" 
            type="number" 
            :rules="[val => val > 0 || 'Morate dodati makar jedan proizvod',
                      val => val <= productForCart.data.stocks || 'Maksimalna kolicina proizvoda ne može da premašuje zalihe']" 
            dense 
            v-model="cartProductAmount" 
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat  label="Prekini"   @click.prevent="addCartDialog = false" />
            <q-btn flat   label="Dodaj u kolica" @click.prevent="addToCart(productForCart)" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import { authUser,getUserFirebase } from "../services/firebase/userservices";
import { getAllProducts, getFilteredProducts } from "../services/firebase/productservice";
import { getUsersCart, updateCart } from "../services/firebase/cartservice";
import JwPagination from 'jw-vue-pagination';



export default {
  name: 'AllProducts',
  data() {
    return {
      products: null,
      productForCart: null,
      user: null,
      pageOfProducts: [],
      filterCategory: null,
      filterSection: null,
      filterSearch: null,
      addCartDialog: false,
      cartProductAmount: 1
    }
  },
  async beforeMount() {
    const currUser = authUser();
    if(currUser) {
      this.user= await getUserFirebase(currUser.uid);
    }
    this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'LOADING PRODUCTS....'
    })
    await this.loadProducts(this.$route);
    this.$q.loading.hide();
  },
  computed: {
    
  },
  watch:{
    $route (to, from){
      // Kada se promijene query parameteri odraditi nove upite
      this.loadProducts(to);
    }
},
  methods: {
    openDialogCart(product) {
      this.addCartDialog = true;
      this.productForCart = product;
    },
    async addToCart() {
      if(this.productForCart.data.stocks < this.cartProductAmount) {
        this.$q.notify({
          message:
            "Nema toliko proizvoda u zalihama, probajte da porucite manje ovaj put!",
            color: "negative",
            duration: "3000"
          });
          return;
      }
      if(this.cartProductAmount <= 0) {
        this.$q.notify({
          message:
            "Morate dodati makar jedan proizvod ukoliko hocete da ga kupite!",
            color: "warrning",
            duration: "3000"
          });
          return;
      }
      if(this.user) {
        const cart = await getUsersCart(this.user.uid);
          // this.product.stocks = this.product.stocks - cartProductAmount;
        console.log({ cart });
        let alreadyAdded = cart.data.products[this.productForCart.id] ? true : false;
        let payload;
        cart.data.total= cart.data.total + (this.cartProductAmount * this.productForCart.data.price);
        if(alreadyAdded) {
          let newProductAmount = cart.data.products[this.productForCart.id] + this.cartProductAmount;
          cart.data.products[this.productForCart.id] = newProductAmount
        } else {
          cart.data.products[this.productForCart.id] = this.cartProductAmount;
        }

        payload = { id: this.user.uid, updates: { ...cart.data }};
        await updateCart(payload);
        this.addCartDialog = false;
        this.$q.notify({
        message:
          "Uspješno ste dodali proizvod u kolica",
          color: "positive",
          duration: "2000"
        });        
      } else {
        console.log("Login required for adding");
        this.$router.push({ name: "LoginPage"});
      }
    },
    onChangePage(pageOfProducts) {
        // update page of products
        this.pageOfProducts = pageOfProducts;
    },
    async loadProducts(route) {
      this.filterCategory = route.query.category;
      this.filterSection =  route.query.section;
      this.filterSearch = route.query.search;
      let data;
      if(this.filterCategory || this.filterSection || this.filterSearch) {
        data = await getFilteredProducts(this.filterCategory, this.filterSection, this.filterSearch);
      } else {
        data = await getAllProducts();
      }
      // if(this.filterSearch) {
      //   data = data.filter(product => !product.data.name.includes(this.filterSearch));
      // } 
      this.products = data;
    }
  },
  components: {
    "product-card": () => import("../components/products/ProductCard"),
    "jw-pagination": JwPagination
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  display: grid;
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto auto auto ;
  grid-gap: 15px;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 70px;;
}
.q-separator.q-separator--horizontal {
  position: absolute;
  bottom: 55px;
  left: 50%;    
  transform: translateX(-50%);
  background: $primary;
}
ul.pagination {
    position: absolute;
    left: 50%;    
    transform: translateX(-50%);
    width: 90%;
    bottom: 10px;
    color: $accent;
    border-radius: 9px;
    background: $primary;
    font-weight: bolder;
    display: flex;
    justify-content: center;
}


@media( min-width: 1200px) {
  .q-page {
    grid-template-columns: auto auto auto auto;
  }
}
@media( max-width: 940px) {
  .q-page {
    grid-template-columns: auto auto;
  }
}
@media( max-width: 450px) {
  .q-page {
    grid-template-columns: auto;
  }
}
</style>
