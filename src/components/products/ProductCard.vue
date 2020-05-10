<template>
  <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <q-card class="my-card" flat bordered :key="product.id" @click.stop="goToProduct()">
      <q-img
      alt="Slika proizvoda"
        :src="product.data.imgURL"
      />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs"> {{ product.data.name }}</div>
        <div class="text-h6 text-accent q-mt-sm q-mb-xs">Category: <span class="text-secondary">{{ productCategory.name }}</span></div>
        <q-img
          :src="sectionIcon"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%); width:35px; height: 35px;"
        >
          <tool-tip>{{ product.data.section }} section</tool-tip>
        </q-img>
        <div class="text-caption text-white font-weight-bold">
          {{ product.data.description }}
        </div>
      </q-card-section>

      <q-card-section style="font-size: 20px;">
        <div class="flex justify-between">
          Cijena proizvoda: <span class="text-positive">{{ product.data.price }} &euro; </span>
        </div>
        <div class="flex justify-between">
          Ostalo u zalihama: <span class="text-white">{{ product.data.stocks}} </span>
        </div>
      </q-card-section>

      <q-card-actions class="flex flex-center">
        <q-btn @click.stop="addToCart" dense color="positive" label="Add to cart" />
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
      expandedDescription: false,
      productCategory: "",
    }
  },
  computed: {
    
  },
  async beforeMount() {
    const cat = await categoryByID(this.product.data.category);
    this.productCategory = cat.data();
  },
  methods: {
    goToProduct() {
      this.$router.push({ name: "SingleProduct", params: { productId: this.product.id }})
    },
    addToCart() {
      if(this.user) {
        console.log({ ...this.user.data, uid: this.user.id });
      } else {
        console.log("Login required for adding");
        this.$router.push({ name: "LoginPage"});
      }
    }
  },
  computed: {
    sectionIcon() {
      if(this.product) {
        const section = this.product.data.section;
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