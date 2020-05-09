<template>
  <q-page>
    <product-card v-for="product in pageOfProducts" :key="product.id" :product="product" :user="user" />
    <div>
      <jw-pagination v-if="products" :items="products" @changePage="onChangePage"></jw-pagination>
    </div>
  </q-page>
</template>

<script>
import { authUser,getUserFirebase } from "../services/firebase/userservices";
import { getProducts } from "../services/firebase/productservice";
import JwPagination from 'jw-vue-pagination';

export default {
  name: 'AllProducts',
  data() {
    return {
      products: null,
      user: null,
      pageOfProducts: []
    }
  },
  async beforeMount() {
    const currUser = authUser();
    if(currUser) {
      this.user= await getUserFirebase(currUser.uid);
    }
    this.products = await getProducts();
  },
  computed: {
    
  },
  methods: {
    onChangePage(pageOfProducts) {
        // update page of products
        this.pageOfProducts = pageOfProducts;
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
  grid-template-columns: auto auto auto ;
  grid-gap: 15px;
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
