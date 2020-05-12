<template>
  <div class="cart" v-if="cartProducts.length">
    <div v-for="product in cartProducts" :key="product.id">
      <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
        <q-card class="my-card" flat bordered :key="product.id" @click.prevent="goToProduct(product)">
          <q-img
          alt="Slika proizvoda"
            :src="product.imgURL"
          />

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs"> {{ product.name }}</div>
            <q-img
              :src="sectionIcon"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%); width:35px; height: 35px;"
            >
              <tool-tip>{{ product.section }} section</tool-tip>
            </q-img>
          </q-card-section>

          <q-card-section style="font-size: 20px;">
            <div class="flex justify-between">
              Cijena proizvoda: <span class="text-positive">{{ product.price }} &euro; </span>
            </div>
            <div class="flex justify-between">
              Broj proizvoda u korpi: <span class="text-positive font-weight-bolder">{{ product.amount}} </span>
            </div>
          </q-card-section>

          <q-card-actions class="flex flex-center">
            <q-btn @click.stop="deleteFromCart(product)" dense color="negative" label="Ukloni iz kolica" icon="remove_shopping_cart" />
          </q-card-actions>
        </q-card>
      </transition-group>
    </div>
    <div class="cart-actions" v-if="cartProducts.length">
      <q-btn @click.stop="orderProducts()" dense color="positive" label="Poruči proizvode iz korpe" icon="label_important" />
      <q-btn @click.stop="clearCart()" dense color="negative" label="Počisti korpu" icon="delete" />
    </div>
  </div>
  <div class="cart text-negative text-center" v-else style="font-size: 35px; font-weight: bolder; "> 
    Trenutno nemate proizvoda u korpi!
  </div>
</template>
<script>
import {
  Loading,
  QSpinnerGears,
  date
} from 'quasar'
import { getUsersCart, deleteFromCart, updateCart } from "../../services/firebase/cartservice";
import { makeOrder } from "../../services/firebase/ordersservice";
import { productByID } from "../../services/firebase/productservice";
export default {
  name: "UserCartPage",
  data() {
    return {
      cart: null,
      cartProducts: []
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
  methods: {
    async deleteFromCart(product) {
      console.log(product);
      let userId = this.$route.params.userId;
      for(let i = 0; i < this.cartProducts.length; i++) {
        if(this.cartProducts[i].id === product.id) {
          this.cartProducts.splice(i, 1);
          this.cart.data.total = this.cart.data.total - (this.cart.data.products[product.id] * product.price);
          delete this.cart.data.products[product.id];
        }
      }
      let payload = { id: userId, updates: { ...this.cart.data }};
      await updateCart(payload);
      this.$q.notify({
        message: "Uspješno ste uklonili proizvod: !",
        color: "positive",
        duration: "4000"
      });
    },
    async clearCart() {
      let userId = this.$route.params.userId;
      this.cartProducts = [];
      this.cart.data.products = {};
      this.cart.data.total = 0;
      let payload = { id: userId, updates: { ...this.cart.data }};
      await updateCart(payload);
      this.$q.notify({
        message: "Uspješno ste počistili vašu korpu!",
        color: "positive",
        duration: "4000"
      });
    },
    async orderProducts() {
      let userId = this.$route.params.userId;
      let order = {
        orderDate: date.formatDate(Date.now(), "dd/MM/YYYY - HH:mm"),
        deliveryDate:date.formatDate(date.addToDate(new Date(), { days: 4 }).getTime(), "dd/MM/YYYY - HH:mm"),
        orderedProducts: this.cart.data.products,
        userId: userId,
        value: this.cart.data.total
      }
      await makeOrder(order);
      await this.clearCart(userId);
      this.cartProducts = [];
      this.$q.notify({
        message: "Uspješno ste poručili proizvode iz korpe!",
        color: "positive",
        duration: "4000"
      });
    },
    goToProduct(product) {
      this.$router.push({ name: "SingleProduct", params: { productId: product.id }})
    },
  },
  async beforeMount() {
    let userId = this.$route.params.userId;
    this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'UČITAVANJE KORISNIKOVIH KOLICA....'
    })
    this.cart = await getUsersCart(userId); 
    Object.keys(this.cart.data.products).forEach(async (productId) => {
      const product = await productByID(productId);
      this.cartProducts.push({...product.data,id:product.id, amount: this.cart.data.products[productId]});
    })
    console.log(this.cartProducts);
    this.$q.loading.hide();
  },
  components: {
    "tool-tip" : () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
  div.cart {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .q-card {
    cursor: pointer;
    background: $primary;
    color: $accent;
    margin-bottom: 10px;
  }
  .q-card:hover {
    cursor: pointer;
    border: 2px solid $accent;
  }
  div.cart-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-evenly;
    grid-template-rows: auto;
    .q-btn {
      margin: auto;
      width: 95%;
      height: 50px;
    }
  }

  @media(max-width: 700px) {
    div.cart {
      grid-template-columns: 1fr;
    }
  } 
</style>