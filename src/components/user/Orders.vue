<template>
  <div v-if="orders.length">
    <div v-for="order in orders" :key="order.id">
      <!-- Porudzbine se dovlace samo jos izlistati i prikazati proizvode kao acordion ili nesto -->
      {{ new Date(parseInt(order.data.deliveryDate)) }}
    </div>
  </div>
  <div v-else>
    Trenutno nemate nijednu porudžbinu
  </div>
</template>
<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import { getUserOrders } from "../../services/firebase/ordersservice";
export default {
  name: "UserOrdersPage",
  data() {
    return {
      orders: []
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
    console.log(this.orders);
    this.$q.loading.hide();
  }
}
</script>