<template>
  <div>
    <q-input style="color: white;" color="accent" outlined v-model="searchText" label-color="accent" label="Pretražite proizvode po nazivu..." clearable>
        <template v-slot:append v-if="!toggleAutoSearch">
          <q-btn @click.stop="searchProducts()" icon="search" color="accent" rounded>
            <tool-tip anchor="bottom left"
              selfPosition="bottom left"
              :delay="2000" >
              Pretraži za unesene vrijednosti
            </tool-tip>
          </q-btn>
        </template>
        <template v-slot:prepend>
          <q-toggle color="accent" v-model="toggleAutoSearch">
            <tool-tip anchor="bottom left"
              selfPosition="bottom left"
              :delay="50" >
              {{ toggleAutoSearch ? "Ugasite auto-pretragu nakon unosa" : "Uključite auto-pretragu" }}
            </tool-tip>
          </q-toggle>
        </template>
      </q-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      toggleAutoSearch: false
    }
  },
  methods: {
    searchProducts() {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.search = this.searchText;
      this.$router.push({ name: "AllProducts", query: queries}).
      then(resp => {
      }).catch(error => {
        this.$router.replace({ query: queries }).catch(err => {
          console.log("Router: nema promjene u kategorijama i sekcijama");
        });
      })
    }
  },
  beforeMount() {
    if(this.$route.query.search) {
      this.searchText = this.$route.query.search;
    }
  },
  watch: {
    searchText(oldVal, newVal) {
      if(this.toggleAutoSearch) {
        this.searchProducts()
      }
    },
    toggleAutoSearch(newVal) {
      if(newVal) {
        this.$q.notify({
          message:
            "Auto-pretraga je uključena!",
          color: "positive",
          duration: "4000"
        });
      } else {
        this.$q.notify({
          message:
            "Auto-pretraga je isključena! Kliknite na dugme pretrage da vidite rezultate..",
          color: "info",
          duration: "4000"
        });
      }
    }
  },
  components: {
    "tool-tip" : () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
.q-input { 
  color: red;
}
</style>