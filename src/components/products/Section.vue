<template>
  <div>
    <q-btn label="Male" @click="filterProductsCategory('male')" />
    <q-btn label="Female" @click="filterProductsCategory('female')" />
    <q-btn label="Kids"  @click="filterProductsCategory('kids')"/>
  </div>
</template>
<script>
export default {
  name: "ProductSection",
  methods: {
    filterProductsCategory(value) {
      // Because of duplicate object query i couldnt push same route 
      // had to remake query and remodel it
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.section = value;
      this.$router.push({ name: "AllProducts", query: queries}).
      then(resp => {
      }).catch(error => {
        this.$router.replace({ query: queries }).catch(err => {
          console.log("Router: nema promjene u kategorijama i sekcijama");
        });
      })
    }
  }
  
}
</script>