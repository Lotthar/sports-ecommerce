<template>
  <q-layout view="lHh Lpr lFf">
    <store-header @showCategoryDrawer="categoryDrawerOpen = !categoryDrawerOpen"/>
    <q-drawer
      :width="250"
      show-if-above
      v-model="categoryDrawerOpen"
      bordered
      content-class="bg-grey-1"
      :breakpoint="765"
    >
      <!-- TODO: dodati korisnicki red sa slikom,imenom, i panelom za opcije -->
      <user-toolbar />
      <!-- TODO:  Dodati listu kategorija sa odredjenom tranzicijom-->
      <category />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      categoryDrawerOpen: false,   
    }
  },
  components: {
    "store-header" : () => import("../components/header/Header"),
    "category" : () => import("../components/products/Category"),
    "user-toolbar": () => import("../components/user/UserDrawerToolbar")
  }
}
</script>

<style lang="scss" scoped>

</style>
