<template>
  <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <q-card class="my-card" flat bordered :key="id">
      <q-img
      alt="Slika proizvoda"
        src="statics/sportswearbackground.jpg"
      />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Product Name</div>
        <div class="text-h6 text-secondary q-mt-sm q-mb-xs">Category Name</div>
        <q-img
          :src="sectionIcon"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%); width:35px; height: 35px;"
        >
          <tool-tip>{{ "male" }} section</tool-tip>
        </q-img>
        <div class="text-caption text-white font-weight-bold">
          Product description
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-section>
        <div class="flex justify-between">
          Cijena proizvoda: <span class="text-white">{{ "Cijena proizvoda" }} </span>
        </div>
        <div class="flex justify-between">
          Ostalo u zalihama: <span class="text-white">{{ "Zalihe proizvoda" }} </span>
        </div>
      </q-card-section>

      <q-card-actions class="flex flex-center">
        <q-btn dense color="positive" label="Add to cart" />
      </q-card-actions>
    </q-card>
  </transition-group>
</template>

<script>
export default {
  props: ["product","id"],
  data() {
    return {
      expandedDescription: false
    }
  },
  computed: {
    sectionIcon() {
      if(this.product) {
        const section = this.product.section;
        switch(section) {
          case "male": return "statics/male-section.png";
          case "female" : return "statics/female-section.png"
          case "kids" : return "statics/kids-section.png"
        }
      }
      return "statics/male-section.png";
    }
  },
  components: {
    "tool-tip": () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
  .q-card {
    background: $primary;
    color: $accent;
    .q-img {
      height: 150px;
    }
  }
  .q-card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: .4s linear;
  }
</style>