<template>
  <div v-if="product">
    <transition 
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
        <q-card class="bg-grey-4" flat bordered :key="product.id" @click.prevent="goToProduct()">
          <q-img
          alt="Slika proizvoda"
            :src="product.data.imgURL"
          />

          <q-card-section>
            <div class="text-h3 q-mt-sm q-mb-xs"> {{ product.data.name }}</div>
            <q-img
              :src="sectionIcon"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%); width:60px; height: 60px;"
            >
              <tool-tip>{{ product.data.section }} sekcija</tool-tip>
            </q-img>
            <div class="text-caption text-accent font-weight-bold" style="font-size: 20px"> 
              {{ product.data.description }}
            </div>
          </q-card-section>

          <q-card-section style="font-size: 30px;">
            <div class="flex justify-between">
              Cijena proizvoda: <span class="text-positive">{{ product.data.price }} &euro; </span>
            </div>
            <div class="flex justify-between">
              Ostalo u zalihama: <span :class="(product.data.stocks > 0 ? 'text-accent' : 'text-negative')">{{ product.data.stocks > 0 ? product.data.stocks : "Trenutno nema u zalihama"}} </span>
            </div>
          </q-card-section>
        </q-card>
    </transition>
  </div>
</template>
<script>
import { productByID, getProductCategory } from "../../services/firebase/productservice";
import {
  Loading,
  QSpinnerGears
} from 'quasar'

export default {
  name: "SingleProduct",
  data() {
    return {
      product: null,
      category: null
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
  async beforeMount() {
    this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'UČITAVAMO PODATKE PROIZVODA....'
    })
    this.product = await productByID(this.$route.params.productId);
    this.category = await getProductCategory(this.product);
    this.$q.loading.hide();
  },
  methods: {
    addCart() {
      console.log(this.product);
      this.$emit("addCart", this.product);
    }
  },
  components: {
    "tool-tip" : () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
div {
  color: $primary;
}
  .q-card {
    background: rgba(0,0,0,0.2);
    cursor: pointer;
    background: $primary;
    color: $accent;
    padding: 20px;
  }

  @media(max-width: 700px) {
    div.cart {
      grid-template-columns: 1fr;
    }
  } 
</style>

