<template>
  <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <q-card class="my-card" flat bordered :key="currentProduct.id" @click.prevent="goToProduct()">
      <q-img
      alt="Slika proizvoda"
        :src="currentProduct.data.imgURL"
      />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs"> {{ currentProduct.data.name }}</div>
        <div class="text-h6 text-accent q-mt-sm q-mb-xs">Kategorija: <span class="text-secondary">{{ productCategory.name }}</span></div>
        <q-img
          :src="sectionIcon"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%); width:35px; height: 35px;"
        >
          <tool-tip>{{ currentProduct.data.section }} section</tool-tip>
        </q-img>
        <div class="text-caption text-white font-weight-bold">
          {{ currentProduct.data.description }}
        </div>
      </q-card-section>

      <q-card-section style="font-size: 20px;">
        <div class="flex justify-between">
          Cijena proizvoda: <span class="text-positive">{{ currentProduct.data.price }} &euro; </span>
        </div>
        <div class="flex justify-between">
          Ostalo u zalihama: <span class="text-white">{{ currentProduct.data.stocks}} </span>
        </div>
      </q-card-section>

      <q-card-actions class="flex flex-center">
        <q-btn @click.stop="addCart()" dense color="positive" label="Add to cart" icon="add_shopping_cart" />
      </q-card-actions>
    </q-card>
  </transition-group>
</template>

<script>
import { categoryByID } from "../../services/firebase/productservice";
export default {
  props: ["product","user"],
  data() {
    return {
      currentProduct: Object.assign({}, this.product),
      expandedDescription: false,
      productCategory: "",
      cartProductAmount: 1,
      addCartDialog: false
    }
  },
  async beforeMount() {
    const cat = await categoryByID(this.currentProduct.data.category);
    this.productCategory = cat.data();
  },
  methods: {
    goToProduct() {
      this.$router.push({ name: "SingleProduct", params: { productId: this.currentProduct.id }})
    },
    addCart() {
      console.log(this.currentProduct);
      this.$emit("addCart", this.currentProduct);
    }
  },
  computed: {
    sectionIcon() {
      if(this.currentProduct) {
        const section = this.currentProduct.data.section;
        switch(section) {
          case "male": return "statics/male-section.png";
          case "female" : return "statics/female-section.png"
          case "kids" : return "statics/kids-section.png"
        }
      }
      return "statics/male-section.png";
    }
  },
  components: {
    "tool-tip": () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
  .q-card {
    cursor: pointer;
    background: $primary;
    color: $accent;
    .q-img {
      height: 150px;
    }
  }
  .q-card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: .4s linear;
  }
</style>