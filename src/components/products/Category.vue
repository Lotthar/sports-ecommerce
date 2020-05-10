<template>
  <div>
    <q-btn :label="category.name" @click="filterProductsCategory()" />
  </div>
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
        location.reload();
      }).catch(error => {
        this.$router.replace({ query: queries }).catch(err => {
          console.log("Router: nema promjene u kategorijama i sekcijama");
        });
      })
    }

  }
}
</script>