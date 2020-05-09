<template>
  <q-page>
    <product-card v-for="index in 10" :key="index" :id="index" />
  </q-page>
</template>

<script>
export default {
  name: 'AllProducts',
  components: {
    "product-card": () => import("../components/products/ProductCard")
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
