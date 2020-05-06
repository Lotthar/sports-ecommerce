<template>
  <q-header elevated>
    <!-- TODO: Dodati user avatar ikonicu gdje moze da otvori i da klikne da vidi narudzbine i korpu -->
    <q-toolbar>
      <tool-tip anchor="bottom left"
            selfPosition="bottom left"
            :delay="50" >Prikazi panel sa kategorijama</tool-tip>
        <q-btn
        class="text-info"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$emit('showCategoryDrawer')"
        />
      
      <q-avatar class="fixed-right avatar-logo">
        <img src="statics/sports-logo.jpg" />
      </q-avatar>
      <search-products-bar class="search-products-bar"/>
    </q-toolbar>
      <!-- TODO: Dodati search bar za pretragu svih proizovda -->
  </q-header>
</template>
<script>
export default {
  data () {
    return {
      categoryTooltipShow: false      
    }
  },
  components: {
    "tool-tip": () => import("../util/ToolTip"),
    "search-products-bar" : () => import("./SearchProducts")
  }
}
</script>

<style lang="scss" scoped>
.q-header {
  padding: 0;
  height: 70px;
  .q-toolbar {
    width:100%;
    height:100%;
    display: grid;
    justify-content: space-between;
    grid-template-areas: '. searchbar searchbar searchbar .';
    grid-gap: 10px;
    .search-products-bar {
      grid-area: searchbar;
    }
  }
}
.q-avatar.avatar-logo {
  margin-right: 6px;
  height: 70px;
  width: 150px;
}
</style>