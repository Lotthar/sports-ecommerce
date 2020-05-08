<template>
  <q-header elevated>
    <!-- TODO: Dodati user avatar ikonicu gdje moze da otvori i da klikne da vidi narudzbine i korpu -->
    <q-toolbar>
        <q-btn
        class="text-info"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$emit('showCategoryDrawer')"
        ><tool-tip anchor="bottom left"
            selfPosition="bottom left"
            :delay="50" >Prikazi panel sa kategorijama</tool-tip></q-btn>

      <user-toolbar class="q-mr-lg" :user="userfb" />

      <q-avatar  class="fixed-right avatar-logo">
        <img src="statics/sports-logo.jpg" @click="$router.push({name: 'HomePage'})"/>
      </q-avatar>

      <search-products-bar class="search-products-bar"/>
    </q-toolbar>
      <!-- TODO: Dodati search bar za pretragu svih proizovda -->
  </q-header>
</template>
<script>
export default {
  props: ["user"],
  data () {
    return {
      categoryTooltipShow: false      
    }
  },
  computed: {
    userfb() {
      return this.user ? this.user : null;
    }
  },
  components: {
    "tool-tip": () => import("../util/ToolTip"),
    "search-products-bar" : () => import("./SearchProducts"),
    "user-toolbar": () => import("../user/UserDrawerToolbar")
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
    grid-template-areas: '. searchbar searchbar searchbar . .';
    grid-gap: 10px;
    .search-products-bar {
      grid-area: searchbar;
    }
  }
}
.q-avatar.avatar-logo {
  border-radius: 9px;
  cursor: pointer;
  margin-right: 6px;
  height: 70px;
  width: 130px;
}
.q-avatar.avatar-logo:hover {
  border: 2px solid $accent;
  transform: scale(1.06);
  transition: 0.5s linear;
}
</style>