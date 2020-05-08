<template>
  <div v-if="user">
    USER-TOOLBAR
    <q-btn :to="`/users/${this.user.uid}`" label="Profile" color="black"/>
    <q-btn :to="`/users/${this.user.uid}/orders`" label="Orders" color="black"/>
    <q-btn :to="`/users/${this.user.uid}/cart`" label="Cart" color="black"/>
    <q-btn @click="signOut()" label="Sign-Out" color="black"/>
  </div>
  <div v-else>
    <q-btn to="/login" label="Login" color="accent"/>
    <q-btn to="/register" label="Register" color="negative"/>
  </div>
</template>

<script>
import { firebaseSignOut } from "../../services/firebase/userservices"
export default {
  props: ["user"],
  methods: {
    async signOut() {
      this.$q
        .dialog({
          title: "Confirm",
          title: "Are you sure you want to sign out?",
          dark: true,
          color: "accent",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await firebaseSignOut();
            console.log("usepjesan sign out");
            this.$router.push({name: "LoginPage"});
          } catch(error) {
            console.log("Greska prilikom signout-a korisnika");
          }
        })
    }
  }
}
</script>