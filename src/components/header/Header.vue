<template>
  <q-header elevated reveal >
    <q-toolbar>
      <q-btn
        class="text-info"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('showCategoryDrawer')"
      >
        <tool-tip anchor="bottom left"
          selfPosition="bottom left"
          :delay="50" >
          Product filters
        </tool-tip>
      </q-btn>

      <user-toolbar class="q-mr-lg user-toolbar" :user="userfb" />

      <q-avatar  class="avatar-logo">
        <img src="statics/sports-logo.jpg" @click="$router.push({name: 'HomePage'})">
        <tool-tip anchor="top left"
          selfPosition="top left"
          :delay="50" >
          Go to Home page
        </tool-tip>
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
  height: 100px;
  border-bottom: 2px solid $accent;
  .q-toolbar {
    width:100%;
    height:100%;
    display: grid;
    justify-content: space-between;
    grid-template-areas: 'categorybtn logo searchbar searchbar searchbar searchbar usertb usertb ';
    grid-gap: 10px;
    .search-products-bar {
      grid-area: searchbar;
    }
    .user-toolbar {
      grid-area: usertb;
    }
    .q-btn {
      grid-area: categorybtn;
    }
    .q-avatar.avatar-logo {
      grid-area: logo;
      border-radius: 9px;
      cursor: pointer;
      margin-right: 6px;
      width: 130px;
      .q-img {
        height: 100%;
      }
    }
    .q-avatar.avatar-logo:hover {
      transform: scale(1.1);
      transition: 0.5s linear;
    }
  }
}

@media(max-width: 650px) {
  .q-header {
    height: unset;
    .q-toolbar {
      justify-content: space-between;
      grid-template-areas: 'logg logo usertb usertb' 
                            'categorybtn searchbar searchbar searchbar';
          
    }
  }
}
@media(min-width: 1024px) {
  .q-header {
    height: unset;
    .q-toolbar {
      justify-content: space-between;
      grid-template-areas: 'categorybtn logo logo searchbar searchbar searchbar searchbar searchbar searchbar usertb usertb';
      .q-avatar.avatar-logo {
        .q-img {
          height: 100%;
        }
      }
    }
  }
}
</style>