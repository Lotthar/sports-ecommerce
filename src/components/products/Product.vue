<template>
<div v-if="!product">
  Loading product....
</div>
  <div v-else>
    Naziv:  {{ product.data.name}}
  </div>
</template>
<script>
import { productByID, getProductCategory } from "../../services/firebase/productservice";

export default {
  data() {
    return {
      product: null,
      category: null
    }
  },
  name: "SingleProduct",
  async beforeMount() {
    const fbProduct = await productByID(this.$route.params.productId);
    this.product = { uid: fbProduct.id , data: fbProduct.data()}
    this.category = await getProductCategory(this.product.data);
  }
}
</script>