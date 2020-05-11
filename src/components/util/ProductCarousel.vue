<template>
  <q-carousel
      animated
      v-model="slide"
      arrows 
      navigation
      infinite
      control-color="accent"
    >
      <q-carousel-slide 
      v-for="(carouselProduct,index) in carouselProducts" 
      :key="index" 
      :name="index" 
      :img-src="carouselProduct.data.imgURL">
        <div class="absolute-top custom-caption"  @click="openProduct(carouselProduct)">
          <div class="text-h2">{{ carouselProduct.data.name }}</div>
          <tool-tip anchor="bottom middle"
            selfPosition="bottom middle"
            :delay="50" >
            Checkout product details!
          </tool-tip>
        </div>
      </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { getAllProducts } from "../../services/firebase/productservice";

export default {
  data () {
    return {
      slide: 1,
      carouselProducts: []
    }
  },
  async beforeMount() {
    const products = await getAllProducts();
    this.carouselProducts = this.prepareCarouselProducts(products);
  },
  methods: {
    openProduct(product) {
      this.$router.push({ name: "SingleProduct", params: { productId: product.id }})
    },
    prepareCarouselProducts(products) {
      let result = [];
      let indexes = [];
      for(let i = 0; i < 5; i++) {
        let randomIndex = this.randomIndex(products.length);
        if(indexes.some(index => index === randomIndex)) {
          i--;
          continue;
        } 
        result.push(products[randomIndex]);
      }
      return result;
    },
    randomIndex(arrayLength){
      return Math.floor(Math.random() * Math.floor(arrayLength));
    }
  },
  components: {
    "tool-tip" : () => import("./ToolTip")
  }
}
</script>
<style scoped lang="scss">
  .q-carousel {
    border-radius: 8px;
    width: 100%;
  }
  .custom-caption {
    text-align: center;
    padding: 12px;
    color: $accent;
    background-color: rgba(0, 0, 0, .3);
    transition: 1s linear;
  }
  .custom-caption:hover {
    cursor: pointer;
    color: $primary;
    background: rgba($color: $accent, $alpha: 0.8);
  }
</style>