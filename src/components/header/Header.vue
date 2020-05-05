<template>
  <q-header elevated>
    <!-- TODO: Dodati user avatar ikonicu gdje moze da otvori i da klikne da vidi narudzbine i korpu -->
    <q-toolbar>
      <tool-tip anchor="bottom left"
            selfPosition="bottom left"
            :delay="200" >Prikazi panel sa kategorijama</tool-tip>
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
    "tool-tip": () => import("../util/ToolTip")
  }
}
</script>

<style lang="scss" scoped>
.q-header {
  height: 80px;
  .q-btn {
    padding: 0px;
    height: 80px;
    border-radius: 9px;
  }

  .q-avatar.avatar-logo {
  margin-right: 10px;
  height: 80px;
  width: 150px;

  .q-img {
    height: 100%;
    width: 100%;
  }
}
}
</style>