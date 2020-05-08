<template>
  <div v-if="user">
    USER-TOOLBAR
    <q-btn :to="`/users/${this.user.uid}`" label="Profile" color="black"/>
    <q-btn :to="`/users/${this.user.uid}/orders`" label="Orders" color="black"/>
    <q-btn :to="`/users/${this.user.uid}/cart`" label="Cart" color="black"/>
  </div>
  <div v-else>
    <q-btn to="/login" label="Login" color="accent"/>
    <q-btn to="/register" label="Register" color="negative"/>
  </div>
</template>

<script>
export default {
  props: ["user"]
}
</script>