<template>
  <div class="sections">
    <q-btn :class="backgroundActiveStyleMale" icon="img:statics/male-section.png"  @click="filterProductsSection('male')">
      <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Filter male products
      </tool-tip>
    </q-btn>
    <q-btn :class="backgroundActiveStyleFemale" icon="img:statics/female-section.png"  @click="filterProductsSection('female')">
      <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Filter female products
      </tool-tip>
    </q-btn>
    <q-btn :class="backgroundActiveStyleKids" icon="img:statics/kids-section.png" @click="filterProductsSection('kids')">
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
  data() {
    return {
      isActiveMale: false,
      isActiveFemale: false,
      isActiveKids: false
    }
  },
  computed: {
    backgroundActiveStyleMale() {
      return this.isActiveMale === true ? "bg-accent text-primary" : "bg-primary text-accent"
    },
    backgroundActiveStyleFemale() {
      return this.isActiveFemale === true ? "bg-accent text-primary" : "bg-primary text-accent"
    },
    backgroundActiveStyleKids() {
      return this.isActiveKids === true ? "bg-accent text-primary" : "bg-primary text-accent"
    }
  },
  async beforeMount() {
    this.determineActiveSection(this.$route.query.section);
  },
  methods: {
    determineActiveSection(section) {
      if(section) {
        this.isActiveMale = section === "male" && !this.isActiveMale ? true : false;
        this.isActiveFemale = section === "female" && !this.isActiveFemale ? true : false;
        this.isActiveKids = section === "kids" && !this.isActiveKids ? true : false;
        return this.isActiveMale || this.isActiveFemale || this.isActiveKids ? true : false;
      } 
      return false;
    },
    filterProductsSection(value) {
      // Because of duplicate object query i couldnt push same route 
      // had to remake query and remodel it
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      if(this.determineActiveSection(value)) {
        queries.section = value;
      } else {
        delete queries.section;
      }
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
    transition: 0.5 linear;
  }
  .q-btn:hover {
    transform: scale(1.04);
  }
}
</style>


