<template>
<div  v-if="!user">
  <h1>Loading user data...</h1>
</div>
  <div v-else>
    PROFILE  {{  `${user.firstname} ${user.lastname}` }}
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { getUserFirebase } from "../../services/firebase/userservices";

export default {
  name: "UserProfile",
  data() {
    return {
      userFB: null
    }
  },
  computed: {
    user() {
      return !this.userFB ? "" : this.userFB.data();
    }
  },
  async mounted() {
    this.userFB = await getUserFirebase(this.$route.params.userId);
    if(!this.userFB.exists) {
      this.$router.push({ name: "LoginPage"});
    }
    console.log(this.userFB);
  }
}
</script>