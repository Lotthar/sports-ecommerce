<template>
  <div v-if="userfb" class="q-pa-md">
    <q-btn-dropdown
      class="user-btn"
      color="accent"
      :label="userfb.data.firstname"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md user-data-menu">Your data</div>
            <q-btn :to="`/users/${userfb.uid}`" label="Profile" color="primary"/>
            <q-btn :to="`/users/${userfb.uid}/orders`" label="Orders" color="primary"/>
            <q-btn :to="`/users/${userfb.uid}/cart`" label="Cart" color="primary"/>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="!userfb.data.imgURL ? 'statics/default-profile.jpg' : userfb.data.imgURL">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ `${userfb.data.firstname} ${userfb.data.lastname}`}}</div>
          <!-- <div class="text-subtitle1 q-mt-md q-mb-xs">Marko Markovic</div> -->

          <q-btn
            @click="signOut()"
            color="primary"
            label="Log-out"
            dense
            size="sm"
            v-close-popup
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
  <div v-else class="flex justify-evenly">
    <q-btn to="/login" label="Login" color="accent"/>
    <q-btn to="/register" label="Register" color="negative"/>
  </div> 
</template>

<script>
import { firebaseSignOut } from "../../services/firebase/userservices"
export default {
  props: ["user"],
  computed: {
    userfb() {
      return this.user ? this.user : null;
    }
  },
  methods: {
    async signOut() {
      this.$q
        .dialog({
          title: "Confirm",
          title: "Are you sure you want to log out?",
          dark: true,
          color: "accent",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await firebaseSignOut();
            console.log("usepjesan sign out");
            if(this.$route.name === "AllProducts") {
              this.$router.push({name: "HomePage"});
            } else {
              this.$router.push({name: "AllProducts"});
            }
          } catch(error) {
            console.log("Greska prilikom signout-a korisnika");
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-btn.q-btn-item {
  margin-bottom: 5px;
}
</style>