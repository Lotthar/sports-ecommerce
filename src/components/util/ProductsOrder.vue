<template>
  <div class="o-product" v-if="product">
    <span>Naziv:</span> {{ product.name }} - <span>Kolicina:</span>{{ product.amount }}
  </div>
</template>

<script>
export default {
  props: ["product"]
}
</script>

<style lang="scss" scoped>
div.o-product {
  color: $positive;
  display: grid;
  grid-template-areas: 1fr;
  align-items: center;
  grid-template-rows: auto;
}
</style>