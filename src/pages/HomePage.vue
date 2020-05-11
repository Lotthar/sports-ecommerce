<template>
  <q-page>
    <div class="products-carousel">
      <products-carousel />
    </div>
    <div>
      MATER TI JEBEEEEM
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    "products-carousel" : () => import("../components/util/ProductCarousel")
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  width: 97%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div.products-carousel {
    margin-left: 3%;
    margin-top: 5px;
    width: 100%;
  }
}
</style>