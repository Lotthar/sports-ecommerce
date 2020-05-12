<template>
  <div class="cart" v-if="cart">
    <div v-for="product in cartProducts" :key="product.id">
      <!-- TODO: Ovdje samo izlistati proizvode i odraditi metodu napravi narudzbinu -->
      {{ product.name }}
    </div>
  </div>
</template>
<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import { getUsersCart } from "../../services/firebase/cartservice";
import { productByID } from "../../services/firebase/productservice";
export default {
  name: "UserCartPage",
  data() {
    return {
      cart: null,
      cartProducts: []
    }
  },
  async beforeMount() {
    let userId = this.$route.params.userId;
    console.log(userId);
    this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'LOADING PRODUCTS....'
    })
    this.cart = await getUsersCart(userId); 
    console.log(this.cart);
    Object.keys(this.cart.data.products).forEach(async (productId) => {
      const product = await productByID(productId);
      this.cartProducts.push({...product.data,id:product.id, amount: this.cart.data.products[productId]});
    })
    console.log(this.cartProducts);
    this.$q.loading.hide();
  }
}
</script>

<style lang="scss" scoped>
  div.cart {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
</style>