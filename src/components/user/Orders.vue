<template>
  <div class="orders" v-if="orders.length">
    <div class="order" v-for="order in orders" :key="order.id">
      <h5>Datum isporuke: <span>{{ order.data.deliveryDate }}</span></h5>
      <h5>Datum porudžbine: <span>{{ order.data.orderDate }}</span></h5>
      <div class="ordered-products" >
        <q-btn  @click="showOrderProducts(order)" label="poručeni proizvodi" class="bg-accent text-primary" />
        <h6>Vrijednost porudžbine: <span> {{ order.data.value }} </span></h6>
      </div>
    </div>
    <q-dialog v-model="orderProductsDialog">
        <div
            class="orderproddialog">
          <transition-group
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
            <q-card v-for="product in ordersProducts"
              :isForOrder="true"
              :product="product" 
              class="my-card" flat bordered 
              :key="product.id" 
              @click.prevent="goToProduct(product.id)">
              <q-img
              alt="Slika proizvoda"
                :src="product.imgURL"
              />

              <q-card-section style="font-size: 20px;" >
                <div class="text-positive text-h5 q-mt-sm q-mb-xs"> {{ product.name }}</div>
                <div class="flex justify-between">
                  Cijena proizvoda: <span class="text-positive">{{ product.price }} &euro; </span>
                </div>
                <div class="flex justify-between">
                  Poručena kolicina: <span class="text-positive">{{ product.amount }}</span>
                </div>
              </q-card-section>

            </q-card>
          </transition-group>
        </div>
    </q-dialog>
  </div>
  <div v-else class="cart text-negative text-center" style="font-size: 35px; font-weight: bolder; ">
    Trenutno nemate nijednu porudžbinu
  </div>
</template>
<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import { getUserOrders } from "../../services/firebase/ordersservice";
import { productByID } from "../../services/firebase/productservice";
export default {
  name: "UserOrdersPage",
  data() {
    return {
      orders: [],
      ordersProducts: [],
      orderProductsDialog: false,
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
      message: 'UČITAVANJE PORUDDŽBINA....'
    })
    this.orders = await getUserOrders(userId);
    this.$q.loading.hide();
  },
  methods: {
    goToProduct(productId) {
      this.$router.push({ name: "SingleProduct", params: { productId }})
    },
    async showOrderProducts(order) {
      this.ordersProducts = [];
      for(let productId of Object.keys(order.data.orderedProducts)) {
        const product = await productByID(productId);
        this.ordersProducts.push({...product.data,id:product.id, amount: order.data.orderedProducts[productId]});
      }
      this.orderProductsDialog = true;
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
div.orders {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto
}
div.order{ 
  background: rgba($color: $primary, $alpha: 1.0);
  padding: 5px;
  border-radius: 9px;;
  color: $accent;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  margin-bottom: 5px;
  span {
    color: $positive;
  }
}
div.ordered-products {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
}
div.o-product {
  color: $positive;
  display: grid;
  grid-template-areas: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-template-rows: auto;
  span {
    color: $accent;
  }
}
div.orderproddialog {
  display: grid;
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: auto auto;
  grid-gap: 15px;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 70px;
  background: rgba($color: $accent, $alpha: 0.8);
}

.q-card {
    cursor: pointer;
    background: $primary;
    color: $accent;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr ;
    margin-bottom: 10px;
  }
  .q-card:hover {
    cursor: pointer;
    transition: .4s linear;
  }
h6 {
  margin: 0;
}
h5 {
  margin: 5px;
}

@media( min-width: 1200px) {
  div.orderproddialog {
    grid-template-columns: auto auto auto auto;
  }
}
@media( max-width: 940px) {
  div.orderproddialog {
    grid-template-columns: auto auto;
  }
}
@media( max-width: 450px) {
  div.orderproddialog {
    grid-template-columns: auto;
  }
}
</style>