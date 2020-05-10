<template>
  <div class="sections">
    <q-btn icon="img:statics/male-section.png"  @click="filterProductsCategory('male')">
      <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Filter male products
      </tool-tip>
    </q-btn>
    <q-btn icon="img:statics/female-section.png"  @click="filterProductsCategory('female')">
      <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Filter female products
      </tool-tip>
    </q-btn>
    <q-btn icon="img:statics/kids-section.png" @click="filterProductsCategory('kids')">
      <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Filter kids products
      </tool-tip>
    </q-btn>
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
  },
  components: {
    "tool-tip" : () => import("../util/ToolTip")
  }
}
</script>
<style lang="scss" scoped>
div.sections{
  width: 90%;
  display: flex;
  justify-content: space-between;
  .q-btn {
    background: $primary;
  }
}
</style>


