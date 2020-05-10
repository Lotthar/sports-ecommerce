<template>
    <q-btn :label="category.name" @click="filterProductsCategory()" />
</template>
<script>
export default {
  props: ["category"],
  name: "ProductCategory",
  methods: {
    filterProductsCategory() {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.category = this.category.id;
      this.$router.push({ name: "AllProducts", query: queries}).
      then(resp => {
        // Fix za sad za ucitavanje parametara za pretragu
      }).catch(error => {
        this.$router.replace({ query: queries }).catch(err => {
          console.log("Router: nema promjene u kategorijama i sekcijama");
        });
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .q-btn {
    width: 90%;
    margin-bottom: 7px;
    background: $primary;
    font-weight: bold;
    padding-top: 2px;
    font-size: 15px;
    transition: 1s linear;
  }
  .q-btn:hover {
    transform: scale(1.01);
  }
</style>